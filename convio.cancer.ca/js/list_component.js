/* Compressed by the perl version of jsmin. */
/* JavaScript::Minifier 0.02 */

var ListComponent={filters:[],filtersMap:[],newListColFilter:function(id,table_id,_param,hidden_cols,has_extra_col)
{var f=new lcColFilter(table_id,_param,hidden_cols,has_extra_col);ListComponent.filters.push(f);ListComponent.filtersMap[id]=f;},getColFilter:function(id)
{return ListComponent.filtersMap[id];},initAllFilters:function()
{for(var f=0;(f<ListComponent.filters.length);f++){var filter=ListComponent.filters[f];var tbl=getObj(filter.tableId);if(tbl){var links=tbl.getElementsByTagName('A');for(var k=0;(k<links.length);k++){if(links[k].name=='lc_close')
set_visible(links[k],true);}}
filter.initColumns(ListComponent.filters[f]);}},reorderListItem:function(_hidName,_delta)
{_delta=(_delta>0)?1:-1;var hid=getObj(_hidName);if(hid){var row=getAncestor('tr',hid);var beforeEl;var otherRow;if((_delta>0)&&row.nextSibling){otherRow=ListComponent.getNextRow(row);if(otherRow)
beforeEl=otherRow.nextSibling;}
else if((_delta<0)&&row.previousSibling)
beforeEl=otherRow=ListComponent.getPreviousRow(row);if(otherRow){row.parentNode.insertBefore(row,beforeEl);ListComponent.toggleRowClass(row);ListComponent.toggleRowClass(otherRow);hid.value=String(parseInt(hid.value)+_delta);hid=otherRow.getElementsByTagName('INPUT').item(0);hid.value=String(parseInt(hid.value)-_delta);}}},getPreviousRow:function(_row)
{var el=_row.previousSibling;while(el&&((el.tagName!='TR')||ListComponent.isHeaderRow(el)))
el=el.previousSibling;return el;},getNextRow:function(_row)
{var el=_row.nextSibling;while(el&&((el.tagName!='TR')||ListComponent.isHeaderRow(el)))
el=el.nextSibling;return el;},isHeaderRow:function(_row)
{return(_row&&(_row.tagName=='TR')&&(_row.getElementsByTagName('TH').length>0));},toggleRowClass:function(_row)
{if(_row&&_row.tagName=='TR'){if(_row.className=='lc_Row1')
_row.className='lc_Row0';else if(_row.className=='lc_Row0')
_row.className='lc_Row1';}},preserveSelection:function(pageLink,rowName)
{var form=getAncestor('form',pageLink);if(form){var selectedValues='';var deselectedValues='';for(var i=0;i<form.elements.length;i++){if(form.elements[i].name==rowName){if(form.elements[i].checked||form.elements[i].type=='hidden'){selectedValues+=form.elements[i].value+",";}
else{deselectedValues+=form.elements[i].value+",";}}}
if(selectedValues.length>1)selectedValues=selectedValues.substring(0,selectedValues.length-1);if(deselectedValues.length>1)deselectedValues=deselectedValues.substring(0,deselectedValues.length-1);pageLink.href+='&'+rowName+'_selected='+selectedValues;pageLink.href+='&'+rowName+'_deselected='+deselectedValues;}}};function lcColFilter(table_id,_param,hidden_cols,has_extra_col)
{this.tableId=table_id;this.paramName=_param;if(hidden_cols)
hidden_cols=hidden_cols.replace(/^_*([^_]*)_*$/g,'$1');this.hiddenCols=hidden_cols?hidden_cols.split('_'):new Array();this.hasExtraCol=has_extra_col;}
lcColFilter.prototype.hideCol=function(colNum)
{this.hideOrShowCol(colNum,true);}
lcColFilter.prototype.showCol=function(colNum)
{this.hideOrShowCol(colNum,false);}
lcColFilter.prototype.hideOrShowCol=function(colNum,hideIt)
{if(colNum=='')
return;if(hideIt==null)
hideIt=true;var table=getObj(this.tableId);var ths=table.getElementsByTagName('TH');var hdrNum=((colNum-1)*2);if(this.hasExtraCol)
hdrNum--;this.hideOrShowNode(ths,hdrNum,hideIt);this.toggleHdr(ths,(hdrNum+1),hideIt);var tds=table.getElementsByTagName('TD');var cellIdRegex='lc_cell_[^_]*_[0-9]*_'+(colNum-1);for(var t=0;t<tds.length;t++){var td=tds.item(t);if(td){if(td.id&&td.id.match(cellIdRegex))
this.hideOrShowNode(tds,t,hideIt);}}
if(hideIt){var found=false;for(var c=0;(!found&&(c<this.hiddenCols.length));c++){if(this.hiddenCols[c]==colNum)
found=true;}
if(!found){this.hiddenCols[this.hiddenCols.length]=colNum;this.updateFilterInPage(this.paramName,this.hiddenCols);}}
else{for(var c=0;(c<this.hiddenCols.length);){if(this.hiddenCols[c]==colNum)
this.hiddenCols.splice(c,1);else
c++;}
this.updateFilterInPage(this.paramName,this.hiddenCols);}}
lcColFilter.prototype.toggleHdr=function(hdrList,hdrNum,hideIt)
{if(hdrList.length>hdrNum){var hdr=hdrList.item(hdrNum);if(hdr!=null){var imgs=hdr.getElementsByTagName('A');for(var i=0;(i<imgs.length);i++){var img=imgs.item(i);if(img!=null){if(img.name&&(img.name=='lc_open'))
set_display(img,hideIt);else
set_display(img,!hideIt);}}}}}
lcColFilter.prototype.hideOrShowNode=function(nodeList,nodeNum,hideIt)
{if(nodeList.length>nodeNum){var node=nodeList.item(nodeNum);if(node!=null){var children=node.childNodes;for(var n=0;n<children.length;n++){var child=children.item(n);if(child){if(isOfClass(child,'lc_empty'))
set_display(child,hideIt);else
set_display(child,!hideIt);}}}}}
lcColFilter.prototype.updateFilterInPage=function(_param,_colFilters)
{var filter_string=_colFilters.join('_');if(!filter_string)
filter_string='_';var hidden=getObj(_param);if(hidden)
hidden.value=filter_string;}
lcColFilter.prototype.updateFilterInLinks=function(_links,_param,_filter)
{for(var a=0;(a<_links.length);a++){if(_links[a].href&&_links[a].href.match('^http'))
_links[a].href=appendToUrl(_links[a].href,_param,_filter);}}
lcColFilter.prototype.initColumns=function()
{if(this.hiddenCols!=null){for(var c=0;(c<this.hiddenCols.length);c++)
this.hideOrShowCol(this.hiddenCols[c],true);}}
addOnLoadHandler(ListComponent.initAllFilters);