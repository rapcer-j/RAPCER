(function(){
  function ready(fn){
    if(document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  function getLang(){
    return localStorage.getItem("rapcerLang") || "en";
  }

  function applyLang(lang){
    document.documentElement.setAttribute("lang", lang);

    document.querySelectorAll("[data-en][data-es]").forEach(function(el){
      var text = lang === "es" ? el.getAttribute("data-es") : el.getAttribute("data-en");
      if(text){ el.textContent = text; }
    });

    localStorage.setItem("rapcerLang", lang);

    var btn = document.getElementById("rapcerLangBtn");
    if(btn){
      btn.textContent = lang === "es" ? "EN" : "ES";
    }
  }

  ready(function(){
    applyLang(getLang());

    var btn = document.getElementById("rapcerLangBtn");
    if(btn){
      btn.addEventListener("click", function(){
        var current = getLang();
        applyLang(current === "es" ? "en" : "es");
      });
    }
  });
})();
