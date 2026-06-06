(function () {
  function txt(v){
    return (v || "").toString().replace(/\s+/g," ").trim().toLowerCase();
  }

  function fire(name, data){
    if (typeof gtag === "function") {
      gtag("event", name, Object.assign({
        page_path: window.location.pathname,
        page_title: document.title
      }, data || {}));
    }
  }

  document.addEventListener("click", function(e){
    var el = e.target.closest("a, button");
    if (!el) return;

    var text = txt(el.innerText || el.textContent || el.getAttribute("aria-label"));
    var href = txt(el.getAttribute("href"));
    var all = text + " " + href;

    var eventName = "rapcer_click";

    if (all.includes("view packages") || all.includes("/packages")) eventName = "view_packages";
    if (all.includes("start project") || all.includes("start new project")) eventName = "start_project";
    if (all.includes("review")) eventName = "open_reviews";
    if (all.includes("support") || all.includes("donation")) eventName = "support_rapcer";

    if (all.includes("starter") && all.includes("monthly")) eventName = "starter_monthly_click";
    else if (all.includes("starter") && (all.includes("full") || all.includes("pay in full"))) eventName = "starter_full_click";

    if (all.includes("growth") && all.includes("monthly")) eventName = "growth_monthly_click";
    else if (all.includes("growth") && (all.includes("full") || all.includes("pay in full"))) eventName = "growth_full_click";

    if (all.includes("premium") && all.includes("monthly")) eventName = "premium_monthly_click";
    else if (all.includes("premium") && (all.includes("full") || all.includes("pay in full"))) eventName = "premium_full_click";

    if (all.includes("custom") || all.includes("quote")) eventName = "custom_quote_click";
    if (all.includes("payment") || all.includes("paypal")) eventName = "payment_click";

    if (all.includes("instagram")) eventName = "instagram_click";
    if (all.includes("tiktok")) eventName = "tiktok_click";
    if (all.includes("facebook")) eventName = "facebook_click";
    if (all.includes("mailto:")) eventName = "email_click";

    fire(eventName, {
      button_text: text || "no_text",
      link_url: href || "no_link"
    });
  });

  window.addEventListener("load", function(){
    var path = txt(window.location.pathname);

    if (path.includes("packages")) fire("packages_page_view");
    if (path.includes("reviews")) fire("reviews_page_view");
    if (path.includes("payment")) fire("payment_page_view");
    if (path.includes("payment-success")) fire("payment_success");
    if (path.includes("onboarding-received")) fire("onboarding_received");
    if (path.includes("payment-request-received")) fire("payment_request_received");
  });
})();
