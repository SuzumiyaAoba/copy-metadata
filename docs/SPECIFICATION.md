# Specification

## Overview

"Copy metadata" is a browser extension that allows users to copy web page
metadata using customizable templates. The extension provides a popup UI, an
options/settings page, and context menu integration for enhanced usability.

## Main Features

- Copy page metadata (title, URL, etc.) to the clipboard
- Use customizable templates for copying metadata
- Context menu integration for quick access
- Options page for managing templates and settings
- Popup UI for quick actions
- Theme and appearance customization

## Permissions

The extension requests the following permissions:

- `contextMenus`: Add custom items to the browser's context menu
- `tabs`: Access information about browser tabs
- `activeTab`: Interact with the currently active tab
- `clipboardWrite`: Copy data to the clipboard
- `storage`: Store user settings and templates

## UI Structure

- **Popup**: Quick access to copy metadata using templates
- **Options Page**: Manage templates, settings, and appearance
- **Context Menu**: Right-click menu for copying metadata directly from any page

## Background Scripts

- Handles context menu creation and logic
- Manages communication between content scripts and the extension UI

## Content Script

- Injected into all pages to extract metadata as needed

## Assets

- Icons for various sizes (16, 32, 48, 128 px)
- SVG and PNG formats for branding and UI

## Technologies Used

- React + TypeScript for UI
- Vite for build tooling
- Tailwind CSS for styling
