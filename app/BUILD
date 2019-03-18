package(default_visibility = ["//visibility:public"])

load("@npm_angular_bazel//:index.bzl", "ng_module")
load("@build_bazel_rules_nodejs//:defs.bzl", "rollup_bundle")

ng_module(
    name = "app",
    srcs = [
        "app.component.ts",
        "app.module.ts",
        "main.factory.ts",
        # polyfills.ts
    ],
    assets = [],
    module_name = "@npmscope/app",
    deps = [
        "//ui",
        "@npm//@types",
        # "@npm//@angular/core",
        # This is needed otherwise target won't compile.
        "@npm//@angular/material", #required pre-ivy
        "@npm//@angular/platform-browser",
    ],
)

rollup_bundle(
    name = "bundle",
    entry_point = "app/main.factory.js",
    deps = [
        ":app",
        # This is not needed, it'd cause duplicate modules.
        # "@npm//@angular/material", #required pre-ivy
        "@npm//rxjs",   #required pre-ivy
    ],
)

load("@build_bazel_rules_nodejs//internal/web_package:web_package.bzl", "web_package")
web_package(
   name = "devapp",
   index_html = "index.html",
   assets = [
        # do not sort
        "@npm//node_modules/zone.js:dist/zone.min.js",
       ":bundle.js",
   ],
   data = [
       # Speed up compilation, not all outputs of `bundle` are needed
    #    ":bundle", # Make all bundles/source-maps available
   ],
)

load("@build_bazel_rules_nodejs//:defs.bzl", "history_server")
history_server(
   name = "devserver",
   data = [":devapp"],
   templated_args = ["app/devapp"],
)
