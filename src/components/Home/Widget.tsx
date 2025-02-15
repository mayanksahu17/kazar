import React, { useEffect } from 'react';

// Extend the Window interface to include __ow
declare global {
  interface Window {
    __ow: any;
    OpenWidget: any;
  }
}

const OpenWidget: React.FC = () => {
  useEffect(() => {
    window.__ow = window.__ow || {};
    window.__ow.organizationId = "343c438e-797a-468d-873d-af0a849a14ad";
    window.__ow.integration_name = "manual_share_page";
    window.__ow.product_name = "openwidget";   
    ;(function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[OpenWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.openwidget.com/openwidget.js",t.head.appendChild(n)}};!n.__ow.asyncInit&&e.init(),n.OpenWidget=n.OpenWidget||e}(window,document,[].slice));
  }, []);

  return (
    <noscript>
      You need to <a href="https://www.openwidget.com/enable-javascript" rel="noopener nofollow">enable JavaScript</a> to use the communication tool powered by <a href="https://www.openwidget.com/" rel="noopener nofollow" target="_blank">OpenWidget</a>
    </noscript>
  );
};

export default OpenWidget;
