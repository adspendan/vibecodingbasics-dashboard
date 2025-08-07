"use strict";
(() => {
var exports = {};
exports.id = 616;
exports.ids = [616];
exports.modules = {

/***/ 117:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  config: () => (/* binding */ config),
  "default": () => (/* binding */ next_route_loaderkind_PAGES_page_2Fsignup_preferredRegion_absolutePagePath_private_next_pages_2Fsignup_js_absoluteAppPath_private_next_pages_2F_app_js_absoluteDocumentPath_private_next_pages_2F_document_js_middlewareConfigBase64_e30_3D_),
  getServerSideProps: () => (/* binding */ getServerSideProps),
  getStaticPaths: () => (/* binding */ getStaticPaths),
  getStaticProps: () => (/* binding */ getStaticProps),
  reportWebVitals: () => (/* binding */ reportWebVitals),
  routeModule: () => (/* binding */ routeModule),
  unstable_getServerProps: () => (/* binding */ unstable_getServerProps),
  unstable_getServerSideProps: () => (/* binding */ unstable_getServerSideProps),
  unstable_getStaticParams: () => (/* binding */ unstable_getStaticParams),
  unstable_getStaticPaths: () => (/* binding */ unstable_getStaticPaths),
  unstable_getStaticProps: () => (/* binding */ unstable_getStaticProps)
});

// NAMESPACE OBJECT: ./pages/signup.js
var signup_namespaceObject = {};
__webpack_require__.r(signup_namespaceObject);
__webpack_require__.d(signup_namespaceObject, {
  "default": () => (Signup)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-modules/pages/module.js
var pages_module = __webpack_require__(185);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-kind.js
var route_kind = __webpack_require__(244);
// EXTERNAL MODULE: ./node_modules/next/dist/build/webpack/loaders/next-route-loader/helpers.js
var helpers = __webpack_require__(182);
// EXTERNAL MODULE: ./pages/_document.js
var _document = __webpack_require__(88);
// EXTERNAL MODULE: ./pages/_app.js
var _app = __webpack_require__(4);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(893);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(689);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(853);
;// CONCATENATED MODULE: external "@stripe/stripe-js"
const stripe_js_namespaceObject = require("@stripe/stripe-js");
;// CONCATENATED MODULE: external "@stripe/react-stripe-js"
const react_stripe_js_namespaceObject = require("@stripe/react-stripe-js");
;// CONCATENATED MODULE: ./pages/signup.js
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../components/CheckoutForm'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../lib/supabase'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());







const stripePromise = (0,stripe_js_namespaceObject.loadStripe)(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
function Signup() {
    const [email, setEmail] = (0,external_react_.useState)("");
    const [password, setPassword] = (0,external_react_.useState)("");
    const [loading, setLoading] = (0,external_react_.useState)(false);
    const [showPayment, setShowPayment] = (0,external_react_.useState)(false);
    const [error, setError] = (0,external_react_.useState)("");
    const router = (0,router_.useRouter)();
    const handleCreateAccount = async (e)=>{
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const { data, error } = await Object(function webpackMissingModule() { var e = new Error("Cannot find module '../lib/supabase'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).auth.signUp({
                email,
                password
            });
            if (error) {
                setError(error.message);
                setLoading(false);
                return;
            }
            setShowPayment(true);
        } catch (err) {
            setError("An error occurred. Please try again.");
            setLoading(false);
        }
    };
    return /*#__PURE__*/ jsx_runtime.jsx("div", {
        className: "min-h-screen flex items-center justify-center bg-purple-50",
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
            className: "bg-white p-8 rounded-lg shadow-lg w-full max-w-md",
            children: [
                /*#__PURE__*/ jsx_runtime.jsx("h1", {
                    className: "text-2xl font-bold mb-6 text-center text-purple-800",
                    children: "Start Your 7-Day Free Trial"
                }),
                !showPayment ? /*#__PURE__*/ (0,jsx_runtime.jsxs)("form", {
                    onSubmit: handleCreateAccount,
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                            className: "mb-4",
                            children: [
                                /*#__PURE__*/ jsx_runtime.jsx("label", {
                                    className: "block text-gray-700 mb-2",
                                    htmlFor: "email",
                                    children: "Email"
                                }),
                                /*#__PURE__*/ jsx_runtime.jsx("input", {
                                    id: "email",
                                    type: "email",
                                    className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500",
                                    value: email,
                                    onChange: (e)=>setEmail(e.target.value),
                                    required: true
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                            className: "mb-6",
                            children: [
                                /*#__PURE__*/ jsx_runtime.jsx("label", {
                                    className: "block text-gray-700 mb-2",
                                    htmlFor: "password",
                                    children: "Password"
                                }),
                                /*#__PURE__*/ jsx_runtime.jsx("input", {
                                    id: "password",
                                    type: "password",
                                    className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500",
                                    value: password,
                                    onChange: (e)=>setPassword(e.target.value),
                                    required: true
                                })
                            ]
                        }),
                        error && /*#__PURE__*/ jsx_runtime.jsx("div", {
                            className: "mb-4 text-red-500",
                            children: error
                        }),
                        /*#__PURE__*/ jsx_runtime.jsx("button", {
                            type: "submit",
                            disabled: loading,
                            className: "w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50",
                            children: loading ? "Creating Account..." : "Create Account"
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                            className: "mt-6 text-center text-sm text-gray-600",
                            children: [
                                /*#__PURE__*/ jsx_runtime.jsx("p", {
                                    children: "Start your 7-day free trial. Cancel anytime."
                                }),
                                /*#__PURE__*/ jsx_runtime.jsx("p", {
                                    className: "mt-2",
                                    children: "After 7 days, you'll be charged $49/month."
                                })
                            ]
                        })
                    ]
                }) : /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                    children: [
                        /*#__PURE__*/ jsx_runtime.jsx("p", {
                            className: "mb-6 text-gray-600",
                            children: "Account created! Please enter your payment details to start your free trial."
                        }),
                        /*#__PURE__*/ jsx_runtime.jsx(react_stripe_js_namespaceObject.Elements, {
                            stripe: stripePromise,
                            children: /*#__PURE__*/ jsx_runtime.jsx(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../components/CheckoutForm'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), {
                                email: email
                            })
                        })
                    ]
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsxs)("p", {
                    className: "mt-4 text-center text-gray-600",
                    children: [
                        "Already have an account? ",
                        /*#__PURE__*/ jsx_runtime.jsx("a", {
                            href: "/login",
                            className: "text-purple-600 hover:underline",
                            children: "Log In"
                        })
                    ]
                })
            ]
        })
    });
}

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES&page=%2Fsignup&preferredRegion=&absolutePagePath=private-next-pages%2Fsignup.js&absoluteAppPath=private-next-pages%2F_app.js&absoluteDocumentPath=private-next-pages%2F_document.js&middlewareConfigBase64=e30%3D!
// @ts-ignore this need to be imported from next/dist to be external



// Import the app and document modules.
// @ts-expect-error - replaced by webpack/turbopack loader

// @ts-expect-error - replaced by webpack/turbopack loader

// Import the userland code.
// @ts-expect-error - replaced by webpack/turbopack loader

const PagesRouteModule = pages_module.PagesRouteModule;
// Re-export the component (should be the default export).
/* harmony default export */ const next_route_loaderkind_PAGES_page_2Fsignup_preferredRegion_absolutePagePath_private_next_pages_2Fsignup_js_absoluteAppPath_private_next_pages_2F_app_js_absoluteDocumentPath_private_next_pages_2F_document_js_middlewareConfigBase64_e30_3D_ = ((0,helpers/* hoist */.l)(signup_namespaceObject, "default"));
// Re-export methods.
const getStaticProps = (0,helpers/* hoist */.l)(signup_namespaceObject, "getStaticProps");
const getStaticPaths = (0,helpers/* hoist */.l)(signup_namespaceObject, "getStaticPaths");
const getServerSideProps = (0,helpers/* hoist */.l)(signup_namespaceObject, "getServerSideProps");
const config = (0,helpers/* hoist */.l)(signup_namespaceObject, "config");
const reportWebVitals = (0,helpers/* hoist */.l)(signup_namespaceObject, "reportWebVitals");
// Re-export legacy methods.
const unstable_getStaticProps = (0,helpers/* hoist */.l)(signup_namespaceObject, "unstable_getStaticProps");
const unstable_getStaticPaths = (0,helpers/* hoist */.l)(signup_namespaceObject, "unstable_getStaticPaths");
const unstable_getStaticParams = (0,helpers/* hoist */.l)(signup_namespaceObject, "unstable_getStaticParams");
const unstable_getServerProps = (0,helpers/* hoist */.l)(signup_namespaceObject, "unstable_getServerProps");
const unstable_getServerSideProps = (0,helpers/* hoist */.l)(signup_namespaceObject, "unstable_getServerSideProps");
// Create and export the route module that will be consumed.
const routeModule = new PagesRouteModule({
    definition: {
        kind: route_kind/* RouteKind */.x.PAGES,
        page: "/signup",
        pathname: "/signup",
        // The following aren't used in production.
        bundlePath: "",
        filename: ""
    },
    components: {
        App: _app["default"],
        Document: _document["default"]
    },
    userland: signup_namespaceObject
});

//# sourceMappingURL=pages.js.map

/***/ }),

/***/ 76:
/***/ ((module) => {

module.exports = require("next/dist/server/future/route-modules/route-module.js");

/***/ }),

/***/ 140:
/***/ ((module) => {

module.exports = require("next/dist/server/get-page-files.js");

/***/ }),

/***/ 716:
/***/ ((module) => {

module.exports = require("next/dist/server/htmlescape.js");

/***/ }),

/***/ 100:
/***/ ((module) => {

module.exports = require("next/dist/server/render.js");

/***/ }),

/***/ 368:
/***/ ((module) => {

module.exports = require("next/dist/server/utils.js");

/***/ }),

/***/ 724:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/constants.js");

/***/ }),

/***/ 743:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/html-context.js");

/***/ }),

/***/ 524:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 689:
/***/ ((module) => {

module.exports = require("react");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [769,947], () => (__webpack_exec__(117)));
module.exports = __webpack_exports__;

})();