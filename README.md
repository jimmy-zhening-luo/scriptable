# @jimbojet/scriptable

[![Azure Publish (PROD.main)](https://github.com/jimmy-zhening-luo/scriptable/actions/workflows/PROD.main.yml/badge.svg)](https://github.com/jimmy-zhening-luo/scriptable/actions/workflows/PROD.main.yml)

## What is Scriptable?

Scriptable iOS/iPadOS lets users author JavaScript procedures invokable by Apple Shortcuts or Widgets, useful for complex device/home automation and data transforms.

Scriptable provides all the classes needed to interact with the above native iOS features and with the user.

## What is `@jimbojet/scriptable`?

This TypeScript project provides a standard class with hooks for Shortcut and filesystem I/O (e.g. settings/cache), transpiling to valid Scriptable code.

## How to use

Note: this project is not production-ready. It runs without failing on my device and with my shortcuts but is still a WIP since it doesn't have a build test suite and it doesn't have a user guide / operating instructions. However, if you are an existing Scriptable moderate user, you should be able to figure out how to use it by starting from the ./boot/!boot/Boot.js module, and its corresponding Scriptable boot runner script, ./boot/!boot.js.
