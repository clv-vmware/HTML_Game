import utils from '../../../util/util';
import React, {Component, PropTypes} from 'react';

/*
    Utilities
    */
// let PivotData, numberFormat, aggregatorTemplates, aggregators, dayNamesEn, derivers, getSort, locales, mthNamesEn, naturalSort, pivotTableRenderer, renderers, usFmt, usFmtInt, usFmtPct, zeroPad;


let hasProp = {}.hasOwnProperty;

let aggregatorTemplates = {
    count: function(formatter) {
        if (formatter == null) {
            formatter = usFmtInt;
        }
        return function() {
            return function(data, rowKey, colKey) {
                return {
                    count: 0,
                    push: function() {
                        return this.count++;
                    },
                    value: function() {
                        return this.count;
                    },
                    format: formatter
                };
            };
        };
    },
    sum: function(formatter) {
        if (formatter == null) {
            formatter = usFmt;
        }
        return function(arg) {
            var attr;
            attr = arg[0];
            return function(data, rowKey, colKey) {
                return {
                    sum: 0,
                    push: function(record) {
                        if (!isNaN(parseFloat(record[attr]))) {
                        return this.sum += parseFloat(record[attr]);
                        }
                    },
                    value: function() {
                        return this.sum;
                    },
                    format: formatter,
                    numInputs: attr != null ? 0 : 1
                };
            };
        };
    },
    // TODO： 为指标打包的aggregator
    each: function () {
        return function (vals) {
            
            return function (data, rowKey, colKey) {
                return {
                    val: null,
                    push: function (record) {
                        
                        for (var i = 0; i < vals.length; i++) {
                            // console.log('EACH', vals, record, vals[i]);
                            if (record.hasOwnProperty(vals[i])) {
                                this.val = record[vals[i]];
                            }
                        }
                    },
                    value: function () {
                        return this.val;
                    }
                }
            }
        }
    }
};

let locales = {
    en: {
        aggregators: aggregators,
        renderers: renderers,
        localeStrings: {
            renderError: "An error occurred rendering the PivotTable results.",
            computeError: "An error occurred computing the PivotTable results.",
            uiRenderError: "An error occurred rendering the PivotTable UI.",
            selectAll: "Select All",
            selectNone: "Select None",
            tooMany: "(too many to list)",
            filterResults: "Filter results",
            totals: "Totals",
            vs: "vs",
            by: "by"
        }
    }
};

let naturalSort = (function(_this) {

    return function(as, bs) {
        var a, a1, b, b1, rd, rx, rz;
        rx = /(\d+)|(\D+)/g;
        rd = /\d/;
        rz = /^0/;
        if (typeof as === "number" || typeof bs === "number") {
            if (isNaN(as)) {
                return 1;
            }
            if (isNaN(bs)) {
                return -1;
            }
            return as - bs;
        }
        a = String(as).toLowerCase();
        b = String(bs).toLowerCase();
        if (a === b) {
            return 0;
        }
        if (!(rd.test(a) && rd.test(b))) {
            return (a > b ? 1 : -1);
        }
        a = a.match(rx);
        b = b.match(rx);
        while (a.length && b.length) {
            a1 = a.shift();
            b1 = b.shift();
            if (a1 !== b1) {
                if (rd.test(a1) && rd.test(b1)) {
                    return a1.replace(rz, ".0") - b1.replace(rz, ".0");
                } else {
                    return (a1 > b1 ? 1 : -1);
                }
            }
        }
        return a.length - b.length;
    };
})(this);

let getSort = function(sorters, attr) {
    var sort;
    sort = sorters(attr);
    // if ($.isFunction(sort)) {
    if (typeof sort === 'function') {
        return sort;
    } else {
        return naturalSort;
    }
};

/*
    Data Model class
    TODO : 提取出PivotData 的class
    */
let PivotData = (function() {
    // 构造函数
    function PivotData(input, opts, positionMap) {

        this.positionMap = positionMap;
        this.getAggregator = this.getAggregator.bind(this);
        this.getRowKeys = this.getRowKeys.bind(this);
        this.getColKeys = this.getColKeys.bind(this);
        this.sortKeys = this.sortKeys.bind(this);
        this.arrSort = this.arrSort.bind(this);
        this.aggregator = opts.aggregator;
        this.aggregatorName = opts.aggregatorName;
        this.colAttrs = opts.cols;
        this.rowAttrs = opts.rows;
        this.valAttrs = opts.vals;
        this.sorters = opts.sorters;
        this.tree = {};
        this.rowKeys = [];
        this.colKeys = [];
        this.rowTotals = {};
        this.colTotals = {};
        this.allTotal = this.aggregator(this, [], []);
        this.sorted = false;
        PivotData.forEachRecord(input, positionMap, opts.derivedAttributes, (function(_this) {
            return function(record) {
                // console.log('RECORD RETURN ', record);
                if (opts.filter(record)) {
                    // console.log('forEachRecord before processRecord', record);
                    return _this.processRecord(record);
                }
            };
        })(this));
    }

    PivotData.forEachRecord = function(input, positionMap, derivedAttributes, f) {
        // console.log('forEachRecord', input, positionMap);
        // console.log('IN FOREACH RECORD', input, derivedAttributes, f);
        var addRecord, compactRecord, i, j, k, l, len1, record, ref, results, results1, tblCols;
        if (!derivedAttributes) {
            addRecord = f;
        } else {
            addRecord = function(record) {

                var k, ref, v;
                for (k in derivedAttributes) {
                    v = derivedAttributes[k];
                    record[k] = (ref = v(record)) != null ? ref : record[k];
                }
                // console.log('forEachRecord addRecord', record);
                return f(record);
            };
        }

        if (typeof input === 'function') {
            return input(addRecord);
        } else if (Array.isArray(input)) {
            // !POSMAP
            if (Array.isArray(input[0])) { // 条目竖坐标（I）
                results = [];
                for (i in input) { // 条目竖坐标（I）
                    if (!hasProp.call(input, i)) continue;
                    compactRecord = input[i];
                    // console.log('forEachRecord', compactRecord, i);
                    if (!(i > 0)) {
                        continue;
                    }
                    record = {};
                    ref = input[0];
                    for (j in ref) { // title, 内部横坐标 （J）
                        // !POSMAP
                        if (!hasProp.call(ref, j)) continue;
                        k = ref[j];
                        record[k] = compactRecord[j];
                        // console.log('forEachRecord', compactRecord[j], record);
                    }
                    results.push(addRecord(record));
                }
                // console.log('forEachRecord', results);
                return results;
            } else {
                // 未处理
                results1 = [];
                for (l = 0, len1 = input.length; l < len1; l++) {
                    record = input[l];
                    results1.push(addRecord(record));
                }
                return results1;
            }
        } else {
            throw new Error("unknown input format");
        }
    };

    // 按照 attrs [] 排序 , 有多个attr 怎么决定顺序？
    PivotData.prototype.arrSort = function(attrs) {
        // console.log('PIVOTRENDER', attrs);
        var a, sortersArr;
        sortersArr = (function() {
            var l, len1, results;
            results = [];
            for (l = 0, len1 = attrs.length; l < len1; l++) {
                a = attrs[l];
                results.push(getSort(this.sorters, a));
            }
            return results;
        }).call(this);
        return function(a, b) {
            var comparison, i, sorter;
            for (i in sortersArr) {
                if (!hasProp.call(sortersArr, i)) continue;
                sorter = sortersArr[i];
                comparison = sorter(a[i], b[i]);
                if (comparison !== 0) {
                    return comparison;
                }
            }
            return 0;
        };
    };

    PivotData.prototype.sortKeys = function() {
        if (!this.sorted) {
            this.sorted = true;
            // console.log('IN ARRAY SORT', this.arrSort(this.rowAttrs));
            this.rowKeys.sort(this.arrSort(this.rowAttrs));
            return this.colKeys.sort(this.arrSort(this.colAttrs));
        }
    };

    PivotData.prototype.getColKeys = function() {
        this.sortKeys();
        return this.colKeys;
    };

    PivotData.prototype.getRowKeys = function() {
        this.sortKeys();
        return this.rowKeys;
    };

    // record 顺序是不对的！
    PivotData.prototype.processRecord = function(record) {
        var colKey, flatColKey, flatRowKey, l, len1, len2, n, ref, ref1, ref2, ref3, rowKey, x;
        colKey = [];
        rowKey = [];
        ref = this.colAttrs;
        console.log('processRecord', ref, record);
        for (l = 0, len1 = ref.length; l < len1; l++) {
            x = ref[l];
            colKey.push((ref1 = record[x]) != null ? ref1 : "null");
        }
        console.log('processRecord colKey', colKey);
        // 根据record 得出某个cell 的rowKey colKey, 
        ref2 = this.rowAttrs;
        for (n = 0, len2 = ref2.length; n < len2; n++) {
            x = ref2[n];
            rowKey.push((ref3 = record[x]) != null ? ref3 : "null");
        }
        console.log('processRecord rowKey', rowKey);
        flatRowKey = rowKey.join(String.fromCharCode(0));
        flatColKey = colKey.join(String.fromCharCode(0));
        this.allTotal.push(record);
        if (rowKey.length !== 0) {
            if (!this.rowTotals[flatRowKey]) {
                this.rowKeys.push(rowKey);
                this.rowTotals[flatRowKey] = this.aggregator(this, rowKey, []);
            }
            // this.rowTotals[flatRowKey].push(record);
        }
        if (colKey.length !== 0) {
            if (!this.colTotals[flatColKey]) {
                this.colKeys.push(colKey);
                this.colTotals[flatColKey] = this.aggregator(this, [], colKey);
            }
            // this.colTotals[flatColKey].push(record);
        }
        if (colKey.length !== 0 && rowKey.length !== 0) {
            if (!this.tree[flatRowKey]) {
                this.tree[flatRowKey] = {};
            }
            if (!this.tree[flatRowKey][flatColKey]) {
                this.tree[flatRowKey][flatColKey] = this.aggregator(this, rowKey, colKey);
            }
            var result = this.tree[flatRowKey][flatColKey].push(record);
            // console.log('TREE', result);
            return result;
        }
    };

    PivotData.prototype.getAggregator = function(rowKey, colKey) {
        
        var agg, flatColKey, flatRowKey;
        flatRowKey = rowKey.join(String.fromCharCode(0));
        flatColKey = colKey.join(String.fromCharCode(0));
        if (rowKey.length === 0 && colKey.length === 0) {
            agg = this.allTotal;
        } else if (rowKey.length === 0) {
            agg = this.colTotals[flatColKey];
        } else if (colKey.length === 0) {
            agg = this.rowTotals[flatRowKey];
        } else {
            // console.log('getAggregator', this.tree, flatRowKey, flatColKey);
            agg = this.tree[flatRowKey][flatColKey];
        }
        return agg != null ? agg : {
            value: (function() {
                return null;
            }),
            format: function() {
                return "";
            }
        };
    };

    return PivotData;

})();

        // UTILS 
function spanSize(arr, i, j) {
        var l, len, n, noDraw, ref, ref1, stop, x;
        if (i !== 0) {
            noDraw = true;
            for (x = l = 0, ref = j; 0 <= ref ? l <= ref : l >= ref; x = 0 <= ref ? ++l : --l) {
                if (arr[i - 1][x] !== arr[i][x]) {
                    noDraw = false;
                }
            }
            if (noDraw) {
                return -1;
            }
        }
        len = 0;
        while (i + len < arr.length) {
            stop = false;
            for (x = n = 0, ref1 = j; 0 <= ref1 ? n <= ref1 : n >= ref1; x = 0 <= ref1 ? ++n : --n) {
                if (arr[i][x] !== arr[i + len][x]) {
                    stop = true;
                }
            }
            if (stop) {
                break;
            }
            len++;
        }
        return len;
    };

        /*
         Default Renderer for hierarchical table layout
         */
        // 根据pivotData  组合table , 返回拼接好的table HTML STRING
        pivotTableRenderer = function(pivotData, opts) {

            var aggregator, c, colAttrs, colKey, colKeys, defaults, i, j, r, result, rowAttrs, rowKey, rowKeys, spanSize, tbody, td, th, thead, totalAggregator, tr, txt, val, x;
            defaults = {
                localeStrings: {
                    totals: "Totals"
                }
            };
            opts = utils.merge(defaults, opts);
            colAttrs = pivotData.colAttrs;

            rowAttrs = pivotData.rowAttrs;

            // 表格左侧标题栏，二维数组
            rowKeys = pivotData.getRowKeys();

            // 表格上面标题栏列表，二维数组
            colKeys = pivotData.getColKeys();
            // console.log('PIVOTRENDER', colKeys);
            


            /**
            * 构建表格
            */
            // Table 容器
            result = [];
            // console.log('THEAD', thead);
            // REACT VERSION
            thead = [];
            tbody = [];

            // 构建 thead
            for (j in colAttrs) {
                if (!hasProp.call(colAttrs, j)) continue;
                c = colAttrs[j];
                tr = [];
                if (parseInt(j) === 0 && rowAttrs.length !== 0) {
                    th = (
                        <th
                            colSpan={rowAttrs.length}
                            rowSpan={colAttrs.length}
                            key={`th-${j}`}>

                        </th>
                    );
                    tr.push(th);
                }
                // console.log('pvtAxisLabel', c);
                th = (
                    <th
                        className="pvtAxisLabel"
                        key="pvtAxisLabel"
                        >
                        {c}
                    </th>
                );
                tr.push(th);

                for (i in colKeys) {
                    if (!hasProp.call(colKeys, i)) continue;
                    colKey = colKeys[i];
                    x = spanSize(colKeys, parseInt(i), parseInt(j));

                    if (x !== -1) {
                        let curRowpan = 1;
                        if (parseInt(j) === colAttrs.length - 1 && rowAttrs.length !== 0) {
                            curRowpan = 2;
                        }
                        // console.log('pvtColLabel',x, curRowpan);
                        th = (
                            <th
                                className="pvtColLabel"
                                colSpan={x}
                                rowSpan={curRowpan}
                                >
                                {colKey[j]}
                            </th>
                        );
                        tr.push(th);
                    }
                }// end of for-loop


                if (parseInt(j) === 0) {
                    let curRow = colAttrs.length + (rowAttrs.length === 0 ? 0 : 1);
                }
                let trNode = (
                    <tr>{tr}</tr>
                );
                thead.push(trNode);


            } // end of thead for-loop
            // console.log('after for loop', tr);
            tr = [];
            if (rowAttrs.length !== 0) {
                for (i in rowAttrs) {
                    if (!hasProp.call(rowAttrs, i)) continue;
                    r = rowAttrs[i];
                    // console.log('pvtAxisLabel', r);
                    th = (
                        <th
                            className="pvtAxisLabel"
                            >{r}
                        </th>
                    );
                    tr.push(th);
                    // console.log('tr length', tr.length);
                }
                // TOTALS
                // console.log('pvtAxisLabel', tr.length);
                // REMOVE LEFT-BOTTOM TOTAL!
                // if (colAttrs.length === 0) {

                //     th = (
                //         <th className="pvtTotalLabel">
                //             Totals
                //         </th>
                //     );
                // }
                // tr.push(th);
                let trNode = (
                    <tr>{tr}</tr>
                );
                thead.push(trNode);
                // console.log('T HEAD', thead);
            }

            let theadNode = (
                <thead>
                    {
                        thead
                    }
                </thead>
            );  


            result.push(theadNode);



             ////////////////// BODY   ////////////////



            tbody = [];
            for (i in rowKeys) {
                if (!hasProp.call(rowKeys, i)) continue;
                rowKey = rowKeys[i];
                tr = [];
                for (j in rowKey) {
                    if (!hasProp.call(rowKey, j)) continue;
                    txt = rowKey[j];

                    x = spanSize(rowKeys, parseInt(i), parseInt(j));
                    // console.log('rowspan',rowKeys[30], parseInt(i), parseInt(j), x);
                    // console.log('rowspan', x);
                    if (x !== -1) {
                        let curColspan = 1;
                        if (parseInt(j) === rowAttrs.length - 1 && colAttrs.length !== 0) {
                            curColspan = 2;
                        }
                        th = (
                            <th
                                className="pvtRowLabel"
                                rowSpan={x}
                                colSpan={curColspan}
                                >{txt}</th>
                        );
                        tr.push(th);
                    }
                }
                for (j in colKeys) {
                    if (!hasProp.call(colKeys, j)) continue;
                    colKey = colKeys[j];
                    aggregator = pivotData.getAggregator(rowKey, colKey);
                    console.log('getAggregator', aggregator);
                    val = aggregator.value();

                    td = (
                        <td
                            className={"pvtVal row" + i + " col" + j}
                            data-value={val}>
                            {val}    
                        </td>
                    );
                    tr.push(td);
                }


                totalAggregator = pivotData.getAggregator(rowKey, []);
                val = totalAggregator.value();

                // td = (
                //     <td
                //         className="pvtTotal rowTotal"
                //         data-value={val}
                //         data-for={"row" + i}
                //         >{val}</td>
                // );
                // tr.push(td);


                tbody.push(<tr>{tr}</tr>);
            } // end for



            tr = [];

            for (j in colKeys) {
                if (!hasProp.call(colKeys, j)) continue;
                colKey = colKeys[j];
                totalAggregator = pivotData.getAggregator([], colKey);
                val = totalAggregator.value();
               
            }


            totalAggregator = pivotData.getAggregator([], []);
            val = totalAggregator.value();

            tbody.push(<tr>{tr}</tr>);
            result.push(
                <tbody>
                    {tbody}
                </tbody>
            );
            // result.setAttribute("data-numrows", rowKeys.length);
            // result.setAttribute("data-numcols", colKeys.length);

            // console.log('finish render', theadNode);
            return result;
        };

        /**
         *  STAT RENDER METHOD
         */


class StatRenderTable extends Component {
    pivotData = null;

    // pivotEntry = function(input, opts, positionMap, measureIdBag) {};
    
    state = {
        highlightTr: null,
    };
    
    // 点击高亮 
    highlightTr = (e, i) => {
        console.log('highlightTr: ', e, i);
        let state = this.state;
        if (state.highlightTr === i) {
            state.highlightTr = null;
        }
        else {
            state.highlightTr = i;
        }
        this.setState(state);
    };

    renderThead = () => {
        var {colAttrs, rowAttrs} = this.pivotData;
            var rowKeys = this.pivotData.getRowKeys();
            var colKeys = this.pivotData.getColKeys();
        return (
            <thead>
                {colAttrs.map((c, j) => {
                    return <tr>
                        {parseInt(j) === 0 && rowAttrs.length !== 0 &&
                            <th colSpan={rowAttrs.length} rowSpan={colAttrs.length}>
                                
                            </th>
                        }
                        {colKeys.map(function(colKey, i) {
                            var x = spanSize(colKeys, parseInt(i), parseInt(j));
                            if (x === -1) return false;
                            return <th colSpan={x}>{colKey[j]}</th>
                        })}
                    </tr>
                })}
                </thead>
        );
    };

    renderTbody = () => {
        let {colAttrs, rowAttrs} = this.pivotData;
        let rowKeys = this.pivotData.getRowKeys();
        let colKeys = this.pivotData.getColKeys();
        let {highlightTr} = this.state;

        let trClass;
        let getAggregator = this.pivotData.getAggregator;
        // if (highlightTr === item.id) {
        //     trClass = 'highlight-tr';
        // }
        return (
            <tbody>
                {rowKeys.map(function(rowKey, i) {
                    if (highlightTr === i) {
                        trClass = 'highlight-tr';
                    }
                    return <tr className={trClass}>
                        {rowKey.map(function(txt, j) {
                            let x = spanSize(rowKeys, parseInt(i), parseInt(j));
                            if (x === -1) return false;
                            return <th rowSpan={x}>{txt}</th>
                        })}
                        {colKeys.map(function(colKey, j) {
                            let aggr = getAggregator(rowKey, colKey);
                            // console.log('StatRenderTable', aggr, colKey);
                            let val = aggr.value();
                            return <td>
                                {val}
                            </td>
                        })}
                    </tr>
                })}
                </tbody>
        );
    };

    render (data, measures) {
         // defaults, e, error, error1, pivotData, result, x;
        let defaults = {
            cols: [],
            rows: [],
            vals: [],
            dataClass: PivotData,
            filter: function() {
                return true;
            },
            aggregator: aggregatorTemplates.count()(),
            aggregatorName: "Count",
            sorters: function() {},
            derivedAttributes: {},
            // renderer: pivotTableRenderer,
            rendererOptions: null,
            localeStrings: locales.en.localeStrings
        };

            // opts = $.extend(defaults, opts);
            let opts = utils.merge(defaults, this.props.opts);
            
            // 准备好数据（pivotData 对象
            // 给 opts 加上  aggregator
            /**
             * var sum = $.pivotUtilities.aggregatorTemplates.sum;
                var numberFormat = $.pivotUtilities.numberFormat;
                var intFormat = numberFormat({digitsAfterDecimal: 0});
                */

            let each = aggregatorTemplates.each;
            opts.aggregator = each()(opts.vals);
            opts.aggregatorName = "Each";
            this.pivotData = new PivotData(this.props.input, opts, this.props.positionMap);
                
            var {colAttrs, rowAttrs} = this.pivotData;
            var rowKeys = this.pivotData.getRowKeys();
            var colKeys = this.pivotData.getColKeys();

            
            // console.log('StatRenderTable', colKeys);
            return <table id="J-result-table" className="xk-table xk-loose pvtTable">
                {
                    this.renderThead()
                }
                {
                    this.renderTbody()
                }
                
            </table>
        }

}

export default StatRenderTable;


StatRenderTable.propTypes = {
    // data: React.PropTypes.object,
    // isLoading: React.PropTypes.bool,
    // error: React.PropTypes.bool,
    // totalCount: React.PropTypes.number,
    // headNames: React.PropTypes.array,
    // bodyNames: React.PropTypes.array
};





        /*
         Pivot Table core: create PivotData object and call Renderer on it
         */
        // 入口: input opts 为用户输入的data, opts
        

        // export default {
        //     pivotEntry: pivotEntry,
        //     PivotData: PivotData,
        //     pivotTableRenderer: pivotTableRenderer,
        //     statPivotRender: StatRenderTable
        // };


