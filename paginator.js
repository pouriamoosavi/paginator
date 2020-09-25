var paginator = {
  init: function(options) {
    try{
      var {selector, defaultPage, lastPage, onChange} = options;
      var parentElement = document.querySelectorAll(selector);
      var currentPage;
      if(typeof selector !== "string" || parentElement.length === 0) {
        throw new Error('"selector" must be of type string and selects a valid dom element. Make sure document is ready');
      }
      if(document.querySelector(selector + ' ul.pagination[id$="_p_602214_ul"]')) {
        throw new Error('The '+ selector +' element is already a paginator element. Try with another selector, or use "destroy" first.');
      }
      if(!onChange) onChange=function(){};
      if(typeof onChange !== 'function') {
        throw new Error('"onChange" must be of type function. It is not mandatory so you may want remove it')
      }

      var finalDefaultPage, finalLastPage;
      if( typeof defaultPage === 'number' || (typeof defaultPage === 'string' && !isNaN(defaultPage)) ) {
        finalDefaultPage = parseInt(defaultPage)
      } else {
        finalDefaultPage = 1;
      }
      currentPage=finalDefaultPage;
      
      if( typeof lastPage === 'number' || (typeof lastPage === 'string' && !isNaN(lastPage)) ) {
        finalLastPage = parseInt(lastPage)
      } else {
        finalLastPage = 1  
      }

      var safeSelector = selector.replace(/[^a-zA-Z0-9 ]/g, "");
      var ulID = safeSelector + '_p_602214_ul';
      var html = '<ul class="pagination" id="' + ulID + '" style="margin-bottom: 0px;">'+
      '<li class="page-item p_602214" data-page="prev"><a class="page-link" href="javascript:;">'+
      '<span title="قبلی"><i class="fa fa-angle-right"></i></span>'+
      '</a></li>'
      for(let i=1;i<= finalLastPage; i++){
        html += '<li class="page-item p_602214' + (i===finalDefaultPage?' active':'') + '" data-page="'+i+'">'+
          '<a class="page-link" href="javascript:;">'+i+'</a></li>'
      }
      html += '<li class="page-item p_602214" data-page="next"><a class="page-link" href="javascript:;">'+
      '<span title="بعدی"><i class="fa fa-angle-left"></i></span></a></li></ul>';

      for(var i=0; i< parentElement.length; i++){
        parentElement[i].innerHTML = html;
      }

      var that = this;
      var pageButtons = document.querySelectorAll(selector + ' .p_602214');
      for(var i=0; i<pageButtons.length; i++) {
        pageButtons[i].addEventListener('click', function() {
          var newPage=this.getAttribute('data-page');
          var prevPage = currentPage;
          if(newPage === 'prev') {
            currentPage--;
          } else if(newPage === 'next') {
            currentPage++;
          } else {
            currentPage = parseInt(newPage);
          }
          if(currentPage < 1) currentPage = 1;
          if(currentPage > lastPage) currentPage = lastPage;
          that.remakePaginate('#' + ulID, currentPage)
          onChange(prevPage, currentPage) //user function
        }, false)
      }
      this.remakePaginate('#' + ulID, currentPage)
      return {code: 0};
    } catch (err) {
      throw err;
    }
  },
  destroy: function (options) {
    try{
      var {selector} = options;
      if(typeof selector !== "string") {
        throw new Error('"selector" must be of type string.');
      }

      var existentPaginator=document.querySelector(selector + ' ul.pagination[id$="_p_602214_ul"]');
      if(existentPaginator){
        existentPaginator.remove();
      }
    } catch (err) {
      throw err;
    }
  },
  remakePaginate: function (selector, newPage) {
    try{
      // var paginations = document.querySelector("").childNodes;
      var paginations = document.querySelector(selector).childNodes;
      if(!newPage || newPage < 4 || newPage > paginations.length-4) {
        for(var i=0; i< paginations.length; i++) {
          var thisPaginate=paginations[i];
          var itemPage=thisPaginate.getAttribute('data-page');
          if(isNaN(itemPage)) {
            thisPaginate.style.display='inline'
          } else {
            itemPage = parseInt(itemPage);
            if(itemPage === newPage) {
              for(var j=0;j<paginations.length;j++){
                paginations[j].classList.remove('active')
              }
              thisPaginate.classList.add('active')
            }
            if(i < 6 && newPage < 4) {
              thisPaginate.style.display='inline'
            } else if (i > paginations.length-7 && newPage > paginations.length-4) {
              thisPaginate.style.display='inline'
            } else {
              thisPaginate.style.display='none'
            }
          }
        }
      } else {
        for(var i=0; i< paginations.length; i++) {
          var thisPaginate=paginations[i];
          var itemPage=thisPaginate.getAttribute('data-page');
          if(isNaN(itemPage)) {
            thisPaginate.style.display='inline'
          } else {
            itemPage = parseInt(itemPage);
            if(itemPage === newPage) {
              for(var j=0;j<paginations.length;j++){
                paginations[j].classList.remove('active')
              }
              thisPaginate.classList.add('active');
            }
            if(Math.abs(itemPage-newPage) < 3) {
              thisPaginate.style.display='inline'
            } else {
              thisPaginate.style.display='none'
            }
          }
        }
      }
    } catch (err) {
      throw err;
    }
  }
}