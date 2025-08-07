"use strict";
(() => {
var exports = {};
exports.id = 26;
exports.ids = [26];
exports.modules = {

/***/ 966:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  config: () => (/* binding */ config),
  "default": () => (/* binding */ next_route_loaderkind_PAGES_page_2Fdashboard_preferredRegion_absolutePagePath_private_next_pages_2Fdashboard_js_absoluteAppPath_private_next_pages_2F_app_js_absoluteDocumentPath_private_next_pages_2F_document_js_middlewareConfigBase64_e30_3D_),
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

// NAMESPACE OBJECT: ./pages/dashboard.js
var dashboard_namespaceObject = {};
__webpack_require__.r(dashboard_namespaceObject);
__webpack_require__.d(dashboard_namespaceObject, {
  "default": () => (Dashboard)
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
;// CONCATENATED MODULE: ./pages/dashboard.js
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../lib/supabase'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());




function Dashboard() {
    const [user, setUser] = (0,external_react_.useState)(null);
    const [subscription, setSubscription] = (0,external_react_.useState)(null);
    const [loading, setLoading] = (0,external_react_.useState)(true);
    const router = (0,router_.useRouter)();
    (0,external_react_.useEffect)(()=>{
        const getUser = async ()=>{
            const { data: { user } } = await Object(function webpackMissingModule() { var e = new Error("Cannot find module '../lib/supabase'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).auth.getUser();
            if (!user) {
                router.push("/login");
                return;
            }
            setUser(user);
            // Get subscription status
            const { data: subscriptionData } = await Object(function webpackMissingModule() { var e = new Error("Cannot find module '../lib/supabase'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).from("user_subscriptions").select("*").eq("user_id", user.id).single();
            setSubscription(subscriptionData);
            setLoading(false);
        };
        getUser();
    }, [
        router
    ]);
    const handleLogout = async ()=>{
        await Object(function webpackMissingModule() { var e = new Error("Cannot find module '../lib/supabase'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).auth.signOut();
        router.push("/");
    };
    if (loading) {
        return /*#__PURE__*/ jsx_runtime.jsx("div", {
            className: "min-h-screen flex items-center justify-center",
            children: "Loading..."
        });
    }
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: "min-h-screen bg-gray-50",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx("header", {
                className: "bg-white shadow",
                children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                    className: "max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                            children: [
                                /*#__PURE__*/ jsx_runtime.jsx("h1", {
                                    className: "text-3xl font-bold text-gray-900",
                                    children: "Vibe Coding Dashboard"
                                }),
                                /*#__PURE__*/ (0,jsx_runtime.jsxs)("p", {
                                    className: "text-gray-600",
                                    children: [
                                        "Welcome back, ",
                                        user.email
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ jsx_runtime.jsx("button", {
                            onClick: handleLogout,
                            className: "px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700",
                            children: "Logout"
                        })
                    ]
                })
            }),
            /*#__PURE__*/ jsx_runtime.jsx("main", {
                className: "max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8",
                children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                    className: "bg-white shadow rounded-lg p-6",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                            className: "mb-8",
                            children: [
                                /*#__PURE__*/ jsx_runtime.jsx("h2", {
                                    className: "text-xl font-semibold mb-2",
                                    children: "Your Subscription"
                                }),
                                /*#__PURE__*/ jsx_runtime.jsx("div", {
                                    className: "bg-gray-50 p-4 rounded-lg",
                                    children: subscription ? /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                        children: [
                                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("p", {
                                                className: "mb-2",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime.jsx("span", {
                                                        className: "font-medium",
                                                        children: "Status:"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("span", {
                                                        className: `ml-2 px-2 py-1 rounded text-xs ${subscription.status === "trialing" ? "bg-yellow-100 text-yellow-800" : subscription.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`,
                                                        children: subscription.status
                                                    })
                                                ]
                                            }),
                                            subscription.status === "trialing" && /*#__PURE__*/ (0,jsx_runtime.jsxs)("p", {
                                                className: "text-sm text-gray-600",
                                                children: [
                                                    "Your free trial ends on ",
                                                    new Date(subscription.trial_end).toLocaleDateString()
                                                ]
                                            })
                                        ]
                                    }) : /*#__PURE__*/ jsx_runtime.jsx("p", {
                                        children: "No subscription found. Please sign up for a plan."
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ jsx_runtime.jsx("h2", {
                            className: "text-xl font-semibold mb-4",
                            children: "Your 7-Day Challenge"
                        }),
                        /*#__PURE__*/ jsx_runtime.jsx("div", {
                            className: "space-y-4",
                            children: [
                                1,
                                2,
                                3,
                                4,
                                5,
                                6,
                                7
                            ].map((day)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                    className: "flex items-center justify-between p-4 border border-gray-200 rounded-md",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                            children: [
                                                /*#__PURE__*/ (0,jsx_runtime.jsxs)("h3", {
                                                    className: "font-medium",
                                                    children: [
                                                        "Day ",
                                                        day,
                                                        ": Lesson Title"
                                                    ]
                                                }),
                                                /*#__PURE__*/ jsx_runtime.jsx("p", {
                                                    className: "text-gray-600 text-sm",
                                                    children: "Brief description of the lesson"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ jsx_runtime.jsx("button", {
                                            className: "px-4 py-2 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200",
                                            children: "Start"
                                        })
                                    ]
                                }, day))
                        }),
                        subscription?.status !== "active" && /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                            className: "mt-8 pt-6 border-t border-gray-200",
                            children: [
                                /*#__PURE__*/ jsx_runtime.jsx("h2", {
                                    className: "text-xl font-semibold mb-4",
                                    children: "Unlock Full 30-Day Challenge"
                                }),
                                /*#__PURE__*/ jsx_runtime.jsx("p", {
                                    className: "text-gray-600 mb-4",
                                    children: "Get access to 23 additional lessons and advanced coding challenges."
                                }),
                                /*#__PURE__*/ jsx_runtime.jsx("a", {
                                    href: "/checkout",
                                    className: "inline-block px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700",
                                    children: "Start 7-Day Free Trial"
                                })
                            ]
                        })
                    ]
                })
            })
        ]
    });
}

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES&page=%2Fdashboard&preferredRegion=&absolutePagePath=private-next-pages%2Fdashboard.js&absoluteAppPath=private-next-pages%2F_app.js&absoluteDocumentPath=private-next-pages%2F_document.js&middlewareConfigBase64=e30%3D!
// @ts-ignore this need to be imported from next/dist to be external



// Import the app and document modules.
// @ts-expect-error - replaced by webpack/turbopack loader

// @ts-expect-error - replaced by webpack/turbopack loader

// Import the userland code.
// @ts-expect-error - replaced by webpack/turbopack loader

const PagesRouteModule = pages_module.PagesRouteModule;
// Re-export the component (should be the default export).
/* harmony default export */ const next_route_loaderkind_PAGES_page_2Fdashboard_preferredRegion_absolutePagePath_private_next_pages_2Fdashboard_js_absoluteAppPath_private_next_pages_2F_app_js_absoluteDocumentPath_private_next_pages_2F_document_js_middlewareConfigBase64_e30_3D_ = ((0,helpers/* hoist */.l)(dashboard_namespaceObject, "default"));
// Re-export methods.
const getStaticProps = (0,helpers/* hoist */.l)(dashboard_namespaceObject, "getStaticProps");
const getStaticPaths = (0,helpers/* hoist */.l)(dashboard_namespaceObject, "getStaticPaths");
const getServerSideProps = (0,helpers/* hoist */.l)(dashboard_namespaceObject, "getServerSideProps");
const config = (0,helpers/* hoist */.l)(dashboard_namespaceObject, "config");
const reportWebVitals = (0,helpers/* hoist */.l)(dashboard_namespaceObject, "reportWebVitals");
// Re-export legacy methods.
const unstable_getStaticProps = (0,helpers/* hoist */.l)(dashboard_namespaceObject, "unstable_getStaticProps");
const unstable_getStaticPaths = (0,helpers/* hoist */.l)(dashboard_namespaceObject, "unstable_getStaticPaths");
const unstable_getStaticParams = (0,helpers/* hoist */.l)(dashboard_namespaceObject, "unstable_getStaticParams");
const unstable_getServerProps = (0,helpers/* hoist */.l)(dashboard_namespaceObject, "unstable_getServerProps");
const unstable_getServerSideProps = (0,helpers/* hoist */.l)(dashboard_namespaceObject, "unstable_getServerSideProps");
// Create and export the route module that will be consumed.
const routeModule = new PagesRouteModule({
    definition: {
        kind: route_kind/* RouteKind */.x.PAGES,
        page: "/dashboard",
        pathname: "/dashboard",
        // The following aren't used in production.
        bundlePath: "",
        filename: ""
    },
    components: {
        App: _app["default"],
        Document: _document["default"]
    },
    userland: dashboard_namespaceObject
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
var __webpack_exports__ = __webpack_require__.X(0, [769,947], () => (__webpack_exec__(966)));
module.exports = __webpack_exports__;

})();