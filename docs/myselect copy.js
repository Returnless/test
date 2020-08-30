/**
 * myversion of select
 *
 */

$.fn.dataTableExt.oPagination.listbox = {
	/*
	 * Function: oPagination.listbox.fnInit
	 * Purpose:  Initalise dom elements required for pagination with listbox input
	 * Returns:  -
	 * Inputs:   object:oSettings - dataTables settings object
	 *             node:nPaging - the DIV which contains this pagination control
	 *             function:fnCallbackDraw - draw function which must be called on update
	 */
	"fnInit": function (oSettings, nPaging, fnCallbackDraw) {
	  var nFirst = document.createElement( 'span' );
    var nPrevious = document.createElement( 'span' );
    var nNext = document.createElement( 'span' );
    var nLast = document.createElement( 'span' );
 
    nFirst.appendChild( document.createTextNode( oSettings.oLanguage.oPaginate.sFirst ) );
    nPrevious.appendChild( document.createTextNode( oSettings.oLanguage.oPaginate.sPrevious ) );
    nNext.appendChild( document.createTextNode( oSettings.oLanguage.oPaginate.sNext ) );
    nLast.appendChild( document.createTextNode( oSettings.oLanguage.oPaginate.sLast ) );
 
    nFirst.className = "paginate_button first";
    nPrevious.className = "paginate_button previous";
    nNext.className="paginate_button next";
    nLast.className = "paginate_button last";
 
    nPaging.appendChild( nFirst );
    nPaging.appendChild( nPrevious );
    nPaging.appendChild( nNext );
    nPaging.appendChild( nLast );
        
		var nInput = document.createElement('select');
		var nPage = document.createElement('span');
		var nOf = document.createElement('span');
		nOf.className = "paginate_of";
		nPage.className = "paginate_page";
		if (oSettings.sTableId !== '') {
			nPaging.setAttribute('id', oSettings.sTableId + '_paginate');
		}
		nInput.style.display = "inline";
		nPage.innerHTML = "第 ";
		nPaging.appendChild(nPage);
		nPaging.appendChild(nInput);
		nPaging.appendChild(nOf);
		$(nInput).change(function (e) { // Set DataTables page property and redraw the grid on listbox change event.
			window.scroll(0,0); //scroll to top of page
			if (this.value === "" || this.value.match(/[^0-9]/)) { /* Nothing entered or non-numeric character */
				return;
			}
			var iNewStart = oSettings._iDisplayLength * (this.value - 1);
			if (iNewStart > oSettings.fnRecordsDisplay()) { /* Display overrun */
				oSettings._iDisplayStart = (Math.ceil((oSettings.fnRecordsDisplay() - 1) / oSettings._iDisplayLength) - 1) * oSettings._iDisplayLength;
				fnCallbackDraw(oSettings);
				return;
			}
			oSettings._iDisplayStart = iNewStart;
			fnCallbackDraw(oSettings);
		}); /* Take the brutal approach to cancelling text selection */
		$('span', nPaging).bind('mousedown', function () {
			return false;
		});
		$('span', nPaging).bind('selectstart', function () {
			return false;
		});
		$(nFirst).click( function () {
            oSettings.oApi._fnPageChange( oSettings, "first" );
            fnCallbackDraw( oSettings );
        } );
 
    $(nPrevious).click( function() {
            oSettings.oApi._fnPageChange( oSettings, "previous" );
            fnCallbackDraw( oSettings );
        } );
 
    $(nNext).click( function() {
            oSettings.oApi._fnPageChange( oSettings, "next" );
            fnCallbackDraw( oSettings );
        } );
 
    $(nLast).click( function() {
            oSettings.oApi._fnPageChange( oSettings, "last" );
            fnCallbackDraw( oSettings );
        } );
		
		
	},
	 
	 
	 
	 
	/*
	 * Function: oPagination.listbox.fnUpdate
	 * Purpose:  Update the listbox element
	 * Returns:  -
	 * Inputs:   object:oSettings - dataTables settings object
	 *             function:fnCallbackDraw - draw function which must be called on update
	 */
	"fnUpdate": function (oSettings, fnCallbackDraw) {
		if (!oSettings.aanFeatures.p) {
			return;
		}
		var iPages = Math.ceil((oSettings.fnRecordsDisplay()) / oSettings._iDisplayLength);
		var iCurrentPage = Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1; /* Loop over each instance of the pager */
		var an = oSettings.aanFeatures.p;
		for (var i = 0, iLen = an.length; i < iLen; i++) {
		  var buttons = an[i].getElementsByTagName('span');
            if ( oSettings._iDisplayStart === 0 )
            {
                buttons[0].className = "paginate_disabled_previous";
                buttons[1].className = "paginate_disabled_previous";
            }
            else
            {
                buttons[0].className = "paginate_enabled_previous";
                buttons[1].className = "paginate_enabled_previous";
            }
 
            if ( oSettings.fnDisplayEnd() == oSettings.fnRecordsDisplay() )
            {
                buttons[2].className = "paginate_disabled_next";
                buttons[3].className = "paginate_disabled_next";
            }
            else
            {
                buttons[2].className = "paginate_enabled_next";
                buttons[3].className = "paginate_enabled_next";
            }
			var spans = an[i].getElementsByTagName('span');
			var inputs = an[i].getElementsByTagName('select');
			var elSel = inputs[0];
			if(elSel.options.length != iPages) {
				elSel.options.length = 0; //clear the listbox contents
				for (var j = 0; j < iPages; j++) { //add the pages
					var oOption = document.createElement('option');
					oOption.text = j + 1;
					oOption.value = j + 1;
					try {
						elSel.add(oOption, null); // standards compliant; doesn't work in IE
					} catch (ex) {
						elSel.add(oOption); // IE only
					}
				}
				spans[1].innerHTML = "&nbsp;of&nbsp;" + iPages;
			}
		  elSel.value = iCurrentPage;
		}
	}
};
