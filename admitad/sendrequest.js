(function(){
  
  setTimeout(function start(){
    if (document.querySelector("button.cta.join_dialog") == null) {
      setTimeout(start,10);
      return;
    }
    document.querySelector("button.cta.join_dialog").click();
    
    setTimeout(function click() {
      if (document.querySelector("#oth_info button.cta.cta_primary") == null || document.getElementById("agreed_chk") == null) {
        setTimeout(click,10);
        return;
      }
      document.getElementById("agreed_chk").click();
      document.querySelector("#oth_info button.cta.cta_primary").click();
      
    }, 10);
    
    
  }, 10);
  
})();