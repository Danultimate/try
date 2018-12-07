#!/bin/bash

./gradlew ${1:-installDevMinSdkDevKernelDebug} --stacktrace && adb shell am start -n elenas.la.embajadoras/host.exp.exponent.MainActivity
