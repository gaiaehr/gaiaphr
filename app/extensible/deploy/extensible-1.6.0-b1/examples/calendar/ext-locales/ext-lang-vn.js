/*!
 * Extensible 1.6.0-b1
 * Copyright(c) 2010-2012 Extensible, LLC
 * licensing@ext.ensible.com
 * http://ext.ensible.com
 */
﻿/**
 * List compiled by mystix on the extjs.com forums.
 * Thank you Mystix!
 * Vietnamese translation
 * By bpmtri
 * 12-April-2007 04:06PM
 */
Ext.onReady(function(){
    var cm = Ext.ClassManager, 
        exists = Ext.Function.bind(cm.get, cm);

    if(Ext.Updater){
        Ext.Updater.defaults.indicatorText = '<div class="loading-indicator">�?ang tải...</div>';
    }

    if(exists('Ext.view.View')){
       Ext.view.View.prototype.emptyText = "";
    }

    if(exists('Ext.grid.Panel')){
       Ext.grid.Panel.prototype.ddText = "{0} dòng được ch�?n";
    }

    if(Ext.TabPanelItem){
       Ext.TabPanelItem.prototype.closeText = "�?óng thẻ này";
    }

    if(exists('Ext.form.field.Base')){
       Ext.form.field.Base.prototype.invalidText = "Giá trị của ô này không hợp lệ.";
    }

    if(Ext.LoadMask){
        Ext.LoadMask.prototype.msg = "�?ang tải...";
    }
    
    if(Ext.Date){
        Ext.Date.monthNames = [
           "Tháng 1",
           "Tháng 2",
           "Tháng 3",
           "Tháng 4",
           "Tháng 5",
           "Tháng 6",
           "Tháng 7",
           "Tháng 8",
           "Tháng 9",
           "Tháng 10",
           "Tháng 11",
           "Tháng 12"
        ];

        Ext.Date.dayNames = [
           "Chủ nhật",
           "Thứ hai",
           "Thứ ba",
           "Thứ tư",
           "Thứ năm",
           "Thứ sáu",
           "Thứ bảy"
        ];
    }
    
    if(Ext.MessageBox){
       Ext.MessageBox.buttonText = {
          ok     : "�?ồng ý",
          cancel : "Hủy b�?",
          yes    : "Có",
          no     : "Không"
       };
    }

    if(exists('Ext.util.Format')){
        Ext.apply(Ext.util.Format, {
            thousandSeparator: '.',
            decimalSeparator: ',',
            currencySign: '\u20ab',  // Vietnamese Dong
            dateFormat: 'd/m/Y'
        });
    }

    if(exists('Ext.picker.Date')){
       Ext.apply(Ext.picker.Date.prototype, {
          todayText         : "Hôm nay",
          minText           : "Ngày này nh�? hơn ngày nh�? nhất",
          maxText           : "Ngày này lớn hơn ngày lớn nhất",
          disabledDaysText  : "",
          disabledDatesText : "",
          monthNames	: Ext.Date.monthNames,
          dayNames		: Ext.Date.dayNames,
          nextText          : 'Tháng sau (Control+Right)',
          prevText          : 'Tháng trước (Control+Left)',
          monthYearText     : 'Ch�?n một tháng (Control+Up/Down để thay đổi năm)',
          todayTip          : "{0} (Spacebar - Phím trắng)",
          format            : "d/m/y"
       });
    }

    if(exists('Ext.toolbar.Paging')){
       Ext.apply(Ext.PagingToolbar.prototype, {
          beforePageText : "Trang",
          afterPageText  : "of {0}",
          firstText      : "Trang đầu",
          prevText       : "Trang trước",
          nextText       : "Trang sau",
          lastText       : "Trang cuối",
          refreshText    : "Tải lại",
          displayMsg     : "Hiển thị {0} - {1} của {2}",
          emptyMsg       : 'Không có dữ liệu để hiển thị'
       });
    }

    if(exists('Ext.form.field.Text')){
       Ext.apply(Ext.form.field.Text.prototype, {
          minLengthText : "Chi�?u dài tối thiểu của ô này là {0}",
          maxLengthText : "Chi�?u dài tối đa của ô này là {0}",
          blankText     : "Ô này cần phải nhập giá trị",
          regexText     : "",
          emptyText     : null
       });
    }

    if(exists('Ext.form.field.Number')){
       Ext.apply(Ext.form.field.Number.prototype, {
          minText : "Giá trị nh�? nhất của ô này là {0}",
          maxText : "Giá trị lớn nhất của ô này là  {0}",
          nanText : "{0} hông phải là một số hợp lệ"
       });
    }

    if(exists('Ext.form.field.Date')){
       Ext.apply(Ext.form.field.Date.prototype, {
          disabledDaysText  : "Vô hiệu",
          disabledDatesText : "Vô hiệu",
          minText           : "Ngày nhập trong ô này phải sau ngày {0}",
          maxText           : "Ngày nhập trong ô này phải trước ngày {0}",
          invalidText       : "{0} không phải là một ngày hợp lệ - phải có dạng {1}",
          format            : "d/m/y"
       });
    }

    if(exists('Ext.form.field.ComboBox')){
       Ext.apply(Ext.form.field.ComboBox.prototype, {
          valueNotFoundText : undefined
       });
        Ext.apply(Ext.form.field.ComboBox.prototype.defaultListConfig, {
            loadingText       : "�?ang tải..."
        });
    }

    if(exists('Ext.form.field.VTypes')){
       Ext.apply(Ext.form.field.VTypes, {
          emailText    : 'Giá trị của ô này phải là một địa chỉ email có dạng như "ten@abc.com"',
          urlText      : 'Giá trị của ô này phải là một địa chỉ web(URL) hợp lệ, có dạng như "http:/'+'/www.example.com"',
          alphaText    : 'Ô này chỉ được nhập các kí tự và gạch dưới(_)',
          alphanumText : 'Ô này chỉ được nhập các kí tự, số và gạch dưới(_)'
       });
    }

    if(exists('Ext.grid.header.Container')){
       Ext.apply(Ext.grid.header.Container.prototype, {
          sortAscText  : "Tăng dần",
          sortDescText : "Giảm dần",
          lockText     : "Khóa cột",
          unlockText   : "B�? khóa cột",
          columnsText  : "Các cột"
       });
    }

    if(exists('Ext.grid.PropertyColumnModel')){
       Ext.apply(Ext.grid.PropertyColumnModel.prototype, {
          nameText   : "Tên",
          valueText  : "Giá trị",
          dateFormat : "j/m/Y"
       });
    }

});