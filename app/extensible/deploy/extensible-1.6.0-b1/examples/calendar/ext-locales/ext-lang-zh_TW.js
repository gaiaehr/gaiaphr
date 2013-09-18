/*!
 * Extensible 1.6.0-b1
 * Copyright(c) 2010-2012 Extensible, LLC
 * licensing@ext.ensible.com
 * http://ext.ensible.com
 */
﻿/**
 * Traditional Chinese translation
 * By hata1234
 * 09 April 2007
 */
Ext.onReady(function(){
    var cm = Ext.ClassManager, 
        exists = Ext.Function.bind(cm.get, cm);

    if(Ext.Updater) {
        Ext.Updater.defaults.indicatorText = '<div class="loading-indicator">讀�?�中...</div>';
    }

    if(exists('Ext.view.View')){
        Ext.view.View.prototype.emptyText = "";
    }

    if(exists('Ext.grid.Panel')){
        Ext.grid.Panel.prototype.ddText = "�?�擇了 {0} 行";
    }

    if(Ext.TabPanelItem){
        Ext.TabPanelItem.prototype.closeText = "關閉此標籤";
    }

    if(exists('Ext.form.field.Base')){
        Ext.form.field.Base.prototype.invalidText = "數值�?符�?�欄�?�?定";
    }

    if(Ext.LoadMask){
        Ext.LoadMask.prototype.msg = "讀�?�中...";
    }
    
    if (Ext.Date){
        Ext.Date.monthNames = [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "�?月",
        "�??月",
        "�??一月",
        "�??二月"
        ];

        Ext.Date.dayNames = [
        "日",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六"
        ];
    }
    
    if(Ext.MessageBox){
        Ext.MessageBox.buttonText = {
            ok : "確定",
            cancel : "�?�消",
            yes : "是",
            no : "�?�"
        };
    }

    if(exists('Ext.util.Format')){
        Ext.apply(Ext.util.Format, {
            thousandSeparator: '.',
            decimalSeparator: ',',
            currencySign: '\u00a5',  // Chinese Yuan
            dateFormat: 'Y/m/d'
        });
    }

    if(exists('Ext.picker.Date')){
        Ext.apply(Ext.picker.Date.prototype, {
            todayText         : "今天",
            minText           : "日期必須大於最�?容許日期",
            maxText           : "日期必須�?於最大容許日期",
            disabledDaysText  : "",
            disabledDatesText : "",
            monthNames        : Ext.Date.monthNames,
            dayNames          : Ext.Date.dayNames,
            nextText          : "下個月 (Ctrl+�?�方�?��?�)",
            prevText          : "上個月 (Ctrl+左方�?��?�)",
            monthYearText     : "�?�擇月份 (Ctrl+上/下方�?��?��?�擇年份)",
            todayTip          : "{0} (空白�?�)",
            format            : "y/m/d"
        });
    }

    if(exists('Ext.picker.Month')) {
        Ext.apply(Ext.picker.Month.prototype, {
            okText            : "确定",
            cancelText        : "�?�消"
        });
    }

    if(exists('Ext.toolbar.Paging')){
        Ext.apply(Ext.PagingToolbar.prototype, {
            beforePageText : "第",
            afterPageText  : "�?，共{0}�?",
            firstText      : "第一�?",
            prevText       : "上一�?",
            nextText       : "下一�?",
            lastText       : "最後�?",
            refreshText    : "�?新整�?�",
            displayMsg     : "顯示{0} - {1}筆,共{2}筆",
            emptyMsg       : '沒有任何資料'
        });
    }

    if(exists('Ext.form.field.Text')){
        Ext.apply(Ext.form.field.Text.prototype, {
            minLengthText : "此欄�?最少�?輸入 {0} 個字",
            maxLengthText : "此欄�?最多輸入 {0} 個字",
            blankText     : "此欄�?為必填",
            regexText     : "",
            emptyText     : null
        });
    }

    if(exists('Ext.form.field.Number')){
        Ext.apply(Ext.form.field.Number.prototype, {
            minText : "此欄�?之數值必須大於 {0}",
            maxText : "此欄�?之數值必須�?於 {0}",
            nanText : "{0} �?是�?�法的數字"
        });
    }

    if(exists('Ext.form.field.Date')){
        Ext.apply(Ext.form.field.Date.prototype, {
            disabledDaysText  : "無法使用",
            disabledDatesText : "無法使用",
            minText           : "此欄�?之日期必須在 {0} 之後",
            maxText           : "此欄�?之日期必須在 {0} 之�?",
            invalidText       : "{0} �?是正確的日期格�? - 必須�?是 「 {1} �? 這樣的格�?",
            format            : "Y/m/d"
        });
    }

    if(exists('Ext.form.field.ComboBox')){
        Ext.apply(Ext.form.field.ComboBox.prototype, {
            valueNotFoundText : undefined
        });
        Ext.apply(Ext.form.field.ComboBox.prototype.defaultListConfig, {
            loadingText       : "讀�?�中 ..."
        });
    }

    if(exists('Ext.form.field.VTypes')){
        Ext.apply(Ext.form.field.VTypes, {
            emailText    : '此欄�?必須輸入�? "user@example.com" 之E-Mail格�?',
            urlText      : '此欄�?必須輸入�? "http:/'+'/www.example.com" 之網�?�格�?',
            alphaText    : '此欄�?僅能輸入�?�形英文字�?�?�底線( _ )符號',
            alphanumText : '此欄�?僅能輸入�?�形英文字�?�?數字�?�底線( _ )符號'
        });
    }

    if(exists('Ext.grid.header.Container')){
        Ext.apply(Ext.grid.header.Container.prototype, {
            sortAscText  : "正�?�排�?",
            sortDescText : "�??�?�排�?",
            lockText     : "鎖定欄�?",
            unlockText   : "解開欄�?鎖定",
            columnsText  : "欄�?"
        });
    }

    if(exists('Ext.grid.PropertyColumnModel')){
        Ext.apply(Ext.grid.PropertyColumnModel.prototype, {
            nameText   : "�??稱",
            valueText  : "數值",
            dateFormat : "Y/m/d"
        });
    }

});