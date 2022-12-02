import React from 'react';
import PropTypes from 'prop-types';
import {
    AtomicBlockUtils,
    CompositeDecorator,
    DefaultDraftBlockRenderMap,
    Editor,
    EditorState,
    Modifier,
    RichUtils,
    SelectionState
} from 'draft-js';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';
import {makeStyles} from '@mui/styles';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatStrikethroughIcon from '@mui/icons-material/FormatStrikethrough';
import LinkIcon from '@mui/icons-material/Link';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Popover from '@mui/material/Popover';
import ButtonGroup from '@mui/material/ButtonGroup';
import LaunchIcon from '@mui/icons-material/Launch';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import MenuItem from '@mui/material/MenuItem';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import FormatColorResetIcon from '@mui/icons-material/FormatColorReset';
import CheckIcon from '@mui/icons-material/Check';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ImageIcon from '@mui/icons-material/Image';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PublishIcon from '@mui/icons-material/Publish';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import PhotoSizeSelectLargeIcon from '@mui/icons-material/PhotoSizeSelectLarge';
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from '@mui/material/Paper';
import 'draft-js/dist/Draft.css';


function _extends() {
    _extends = Object.assign || function (target) {
        for (let i = 1; i < arguments.length; i++) {
            const source = arguments[i];

            for (let key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }

        return target;
    };

    return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    const target = {};
    const sourceKeys = Object.keys(source);
    let key, i;

    for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }

    return target;
}

function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    let n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
    let it;

    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            let i = 0;
            return function () {
                if (i >= o.length) return {
                    done: true
                };
                return {
                    done: false,
                    value: o[i++]
                };
            };
        }

        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    it = o[Symbol.iterator]();
    return it.next.bind(it);
}

function DividerControl() {
    return /*#__PURE__*/React.createElement(Divider, {
        orientation: "vertical",
        flexItem: true
    });
}

function useEditor() {
    return React.useContext(EditorContext);
}

function useEditorFocus() {
    const editor = useEditor();

    const _React$useState = React.useState(0),
        changesCount = _React$useState[0],
        setChangesCount = _React$useState[1];

    React.useEffect(function () {
        if (changesCount > 0) editor.ref.focus();
    }, [changesCount, editor.ref]);
    return function () {
        setChangesCount(function (currentChangesCount) {
            return currentChangesCount + 1;
        });
    };
}

const useStyles = makeStyles({
    badge: function badge(props) {
        return {
            background: props.badgeColor
        };
    }
});

function ButtonControl(_ref) {
    const children = _ref.children,
        onClick = _ref.onClick,
        _ref$disabled = _ref.disabled,
        disabled = _ref$disabled === void 0 ? false : _ref$disabled,
        _ref$active = _ref.active,
        active = _ref$active === void 0 ? false : _ref$active,
        _ref$text = _ref.text,
        text = _ref$text === void 0 ? '' : _ref$text,
        _ref$badgeColor = _ref.badgeColor,
        badgeColor = _ref$badgeColor === void 0 ? null : _ref$badgeColor,
        rest = _objectWithoutPropertiesLoose(_ref, ["children", "onClick", "disabled", "active", "text", "badgeColor"]);

    const classes = useStyles({
        badgeColor: badgeColor
    });
    return /*#__PURE__*/React.createElement(Tooltip, {
        title: text,
        "aria-disabled": disabled
    }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(IconButton, _extends({
        onClick: onClick,
        disabled: disabled,
        color: active ? 'primary' : 'default'
    }, rest), /*#__PURE__*/React.createElement(Badge, {
        anchorOrigin: {
            vertical: 'top',
            horizontal: 'left'
        },
        classes: {
            badge: classes.badge
        },
        overlap: "circular",
        badgeContent: " ",
        invisible: badgeColor === null,
        variant: "dot"
    }, children))));
}

ButtonControl.propTypes = {
    children: PropTypes.any.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    text: PropTypes.any,
    badgeColor: PropTypes.any,
    active: PropTypes.bool
};

function UndoControl() {
    const editor = useEditor();
    const editorFocus = useEditorFocus();

    const onClick = function onClick() {
        editor.onChange(EditorState.undo(editor.editorState));
        editorFocus();
    };

    return /*#__PURE__*/React.createElement(ButtonControl, {
        onClick: onClick,
        text: editor.translate('controls.undo.title'),
        disabled: editor.editorState.getUndoStack().count() === 0
    }, /*#__PURE__*/React.createElement(UndoIcon, null));
}

function RedoControl() {
    const editor = useEditor();
    const editorFocus = useEditorFocus();

    const onClick = function onClick() {
        editor.onChange(EditorState.redo(editor.editorState));
        editorFocus();
    };

    return /*#__PURE__*/React.createElement(ButtonControl, {
        onClick: onClick,
        text: editor.translate('controls.redo.title'),
        disabled: editor.editorState.getRedoStack().count() === 0
    }, /*#__PURE__*/React.createElement(RedoIcon, null));
}

const toggleMappedInlineStyle = function toggleMappedInlineStyle(editorState, styleKeys, newInlineStyle) {
    const selection = editorState.getSelection();
    const newContentState = styleKeys.reduce(function (contentState, inlineStyle) {
        return Modifier.removeInlineStyle(contentState, selection, inlineStyle);
    }, editorState.getCurrentContent());
    let newEditorState = EditorState.push(editorState, newContentState, 'change-inline-style');
    const currentStyle = editorState.getCurrentInlineStyle();

    if (selection.isCollapsed()) {
        newEditorState = currentStyle.reduce(function (state, inlineStyle) {
            return RichUtils.toggleInlineStyle(state, inlineStyle);
        }, newEditorState);
    }

    if (!currentStyle.has(newInlineStyle)) {
        newEditorState = RichUtils.toggleInlineStyle(newEditorState, newInlineStyle);
    }

    return newEditorState;
};
const getCurrentMappedInlineStyle = function getCurrentMappedInlineStyle(editorState, styleKeys, defaultInlineStyle) {
    if (defaultInlineStyle === void 0) {
        defaultInlineStyle = null;
    }

    const currentStyle = editorState.getCurrentInlineStyle();
    return currentStyle.find(function (inlineStyle) {
        return styleKeys.includes(inlineStyle);
    }) || defaultInlineStyle;
};
const hasAllSelectionTheInlineStyle = function hasAllSelectionTheInlineStyle(editorState, inlineStyle) {
    const selection = editorState.getSelection();
    const startKey = selection.getStartKey();
    const startOffset = selection.getStartOffset();
    const endKey = selection.getEndKey();
    const endOffset = selection.getEndOffset();
    const currentContent = editorState.getCurrentContent();
    let block = currentContent.getBlockForKey(startKey);
    let allHasTheInlineStyle = true;

    const styleRangesCallback = function styleRangesCallback(block) {
        return function (start, end) {
            const expectedStart = block.getKey() === startKey ? startOffset : 0;
            const expectedEnd = block.getKey() === endKey ? endOffset : block.getLength() - 1;
            allHasTheInlineStyle = start <= expectedStart && end >= expectedEnd;
        };
    };

    while (block && allHasTheInlineStyle) {
        allHasTheInlineStyle = false;
        block.findStyleRanges(function (character) {
            return character.hasStyle(inlineStyle);
        }, styleRangesCallback(block));
        if (block.getKey() !== endKey) break;
        block = currentContent.getBlockAfter(block.getKey());
    }

    return allHasTheInlineStyle;
};
const getCurrentBlockType = function getCurrentBlockType(editorState, availableBlockTypes) {
    const blockType = RichUtils.getCurrentBlockType(editorState);
    if (availableBlockTypes.find(function (avBlockType) {
        return avBlockType === blockType;
    })) return blockType;
    return 'default';
};
const applyEntityToCurrentSelection = function applyEntityToCurrentSelection(editorState, entityType, mutability, entityData) {
    const content = editorState.getCurrentContent();
    const contentWithEntity = content.createEntity(entityType, mutability, entityData);
    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    const selection = editorState.getSelection();
    const contentStateWithEntity = Modifier.applyEntity(contentWithEntity, selection, entityKey);
    return EditorState.push(editorState, contentStateWithEntity, 'apply-entity');
};

ToggleInlineStyleButtonControl.propTypes = {
    inlineStyle: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired,
    text: PropTypes.any
};

function ToggleInlineStyleButtonControl(_ref) {
    const inlineStyle = _ref.inlineStyle,
        children = _ref.children,
        text = _ref.text;
    const editor = useEditor();
    const editorFocus = useEditorFocus();

    const _React$useState = React.useState(false),
        isActive = _React$useState[0],
        setIsActive = _React$useState[1];

    React.useEffect(function () {
        setIsActive(hasAllSelectionTheInlineStyle(editor.editorState, inlineStyle));
    }, [editor.editorState, inlineStyle]);

    const onClick = function onClick() {
        const newEditorState = RichUtils.toggleInlineStyle(editor.editorState, inlineStyle);
        editor.onChange(newEditorState);
        editorFocus();
    };

    return /*#__PURE__*/React.createElement(ButtonControl, {
        text: text,
        onClick: onClick,
        active: isActive,
        disabled: editor.editorState.getSelection().isCollapsed()
    }, children);
}

const inlineStyles = {
    BOLD: 'BOLD',
    ITALIC: 'ITALIC',
    UNDERLINE: 'UNDERLINE',
    STRIKETHROUGH: 'STRIKETHROUGH',
    CODE: 'CODE',
    FONT_FAMILY: 'FONT_FAMILY',
    FONT_SIZE: 'FONT_SIZE',
    FONT_COLOR: 'FONT_COLOR',
    FONT_BACKGROUND: 'FONT_BACKGROUND'
};

function BoldControl() {
    const editor = useEditor();
    return /*#__PURE__*/React.createElement(ToggleInlineStyleButtonControl, {
        inlineStyle: inlineStyles.BOLD,
        text: editor.translate('controls.bold.title')
    }, /*#__PURE__*/React.createElement(FormatBoldIcon, null));
}

function ItalicControl() {
    const editor = useEditor();
    return /*#__PURE__*/React.createElement(ToggleInlineStyleButtonControl, {
        inlineStyle: inlineStyles.ITALIC,
        text: editor.translate('controls.italic.title')
    }, /*#__PURE__*/React.createElement(FormatItalicIcon, null));
}

function UnderlineControl() {
    const editor = useEditor();
    return /*#__PURE__*/React.createElement(ToggleInlineStyleButtonControl, {
        inlineStyle: inlineStyles.UNDERLINE,
        text: editor.translate('controls.underline.title')
    }, /*#__PURE__*/React.createElement(FormatUnderlinedIcon, null));
}

function StrikethroughControl() {
    const editor = useEditor();
    return /*#__PURE__*/React.createElement(ToggleInlineStyleButtonControl, {
        inlineStyle: inlineStyles.STRIKETHROUGH,
        text: editor.translate('controls.strikethrough.title')
    }, /*#__PURE__*/React.createElement(FormatStrikethroughIcon, null));
}

const entities = {
    LINK: 'LINK',
    IMAGE: 'IMAGE'
};

function LinkAddControl() {
    const editor = useEditor();
    const editorFocus = useEditorFocus();

    const _React$useState = React.useState(false),
        isDialogOpened = _React$useState[0],
        setIsDialogOpened = _React$useState[1];

    const _React$useState2 = React.useState(''),
        link = _React$useState2[0],
        setLink = _React$useState2[1];

    const formRef = React.createRef();

    const onClick = function onClick() {
        setLink('');
        setIsDialogOpened(true);
    };

    const handleCloseDialog = function handleCloseDialog() {
        setIsDialogOpened(false);
    };

    const onChangeLink = function onChangeLink(ev) {
        setLink(ev.currentTarget.value);
    };

    const handleSubmit = function handleSubmit(ev) {
        ev.preventDefault();
        if (link === '') return;
        handleCloseDialog();
        editor.onChange(applyEntityToCurrentSelection(editor.editorState, entities.LINK, 'MUTABLE', {
            url: link
        }));
        editorFocus();
    };

    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ButtonControl, {
        onClick: onClick,
        text: editor.translate('controls.linkAdd.title'),
        disabled: editor.editorState.getSelection().isCollapsed()
    }, /*#__PURE__*/React.createElement(LinkIcon, null)), /*#__PURE__*/React.createElement(Dialog, {
        open: isDialogOpened,
        onClose: handleCloseDialog
    }, /*#__PURE__*/React.createElement("form", {
        ref: formRef,
        onSubmit: handleSubmit
    }, /*#__PURE__*/React.createElement(DialogContent, null, /*#__PURE__*/React.createElement(TextField, {
        autoFocus: true,
        label: editor.translate('controls.linkAdd.labels.link'),
        value: link,
        onChange: onChangeLink,
        fullWidth: true
    })), /*#__PURE__*/React.createElement(DialogActions, null, /*#__PURE__*/React.createElement(Button, {
        type: "button",
        onClick: handleCloseDialog,
        color: "primary"
    }, editor.translate('controls.linkAdd.actions.cancel')), /*#__PURE__*/React.createElement(Button, {
        type: "submit",
        color: "primary",
        disabled: link === ''
    }, editor.translate('controls.linkAdd.actions.add'))))));
}

const linkStrategy = function linkStrategy(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(function (character) {
        const entityKey = character.getEntity();
        return entityKey !== null && contentState.getEntity(entityKey).getType() === entities.LINK;
    }, callback);
};

const EditorLink = function EditorLink(_ref) {
    const contentState = _ref.contentState,
        entityKey = _ref.entityKey,
        blockKey = _ref.blockKey,
        start = _ref.start,
        end = _ref.end,
        children = _ref.children;

    const _React$useState = React.useState(null),
        anchorEl = _React$useState[0],
        setAnchorEl = _React$useState[1];

    const editor = useEditor();
    const editorFocus = useEditorFocus();

    const _contentState$getEnti = contentState.getEntity(entityKey).getData(),
        url = _contentState$getEnti.url;

    const showOptions = function showOptions(ev) {
        setAnchorEl(ev.currentTarget);
    };

    const hideOptions = function hideOptions() {
        setAnchorEl(null);
    };

    const openLink = function openLink(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        window.open(url, '_blank');
    };

    const removeLink = function removeLink(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        const linkSelection = SelectionState.createEmpty(blockKey).merge({
            anchorKey: blockKey,
            anchorOffset: start,
            focusKey: blockKey,
            focusOffset: end
        });
        editor.onChange(RichUtils.toggleLink(editor.editorState, linkSelection, null));
        editorFocus();
    };

    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Link, {
        href: url,
        rel: "noopener noreferrer",
        target: "_blank",
        "aria-label": url,
        onClick: showOptions
    }, children), /*#__PURE__*/React.createElement(Popover, {
        open: Boolean(anchorEl),
        onClose: hideOptions,
        anchorEl: anchorEl,
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center'
        },
        transformOrigin: {
            vertical: 'top',
            horizontal: 'center'
        }
    }, /*#__PURE__*/React.createElement(ButtonGroup, {
        size: "small",
        "aria-label": "Link options"
    }, /*#__PURE__*/React.createElement(Button, {
        onClick: openLink,
        title: "Open " + url
    }, /*#__PURE__*/React.createElement(LaunchIcon, null)), /*#__PURE__*/React.createElement(Button, {
        onClick: removeLink,
        title: "Remove link"
    }, /*#__PURE__*/React.createElement(LinkOffIcon, null)))));
};

EditorLink.propTypes = {
    contentState: PropTypes.object.isRequired,
    entityKey: PropTypes.string.isRequired,
    blockKey: PropTypes.string.isRequired,
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    children: PropTypes.any
};

const linkAddPlugin = function linkAddPlugin() {
    return {
        decorators: [{
            strategy: linkStrategy,
            component: EditorLink
        }]
    };
};

function LinkRemoveControl() {
    const editor = useEditor();

    const onClick = function onClick() {
        const selection = editor.editorState.getSelection();
        editor.onChange(RichUtils.toggleLink(editor.editorState, selection, null));
    };

    return /*#__PURE__*/React.createElement(ButtonControl, {
        onClick: onClick,
        text: editor.translate('controls.linkRemove.title'),
        disabled: editor.editorState.getSelection().isCollapsed()
    }, /*#__PURE__*/React.createElement(LinkOffIcon, null));
}

const LANG_PREFIX = 'lang::';

const translateLiteralWithPrefix = function translateLiteralWithPrefix(literal, translateFn) {
    return (typeof literal === 'string' || literal instanceof String) && literal.substr(0, LANG_PREFIX.length) === LANG_PREFIX ? translateFn(literal.substr(LANG_PREFIX.length)) : literal;
};

const useStyles$1 = makeStyles(function (theme) {
    return {
        selectControl: {
            margin: theme.spacing(1),
            marginTop: '13px'
        }
    };
});

function DropdownControl(_ref) {
    const value = _ref.value,
        _onChange = _ref.onChange,
        options = _ref.options,
        label = _ref.label,
        _ref$minWidth = _ref.minWidth,
        minWidth = _ref$minWidth === void 0 ? 120 : _ref$minWidth,
        rest = _objectWithoutPropertiesLoose(_ref, ["value", "onChange", "options", "minWidth"]);

    const classes = useStyles$1();
    const editor = useEditor();
    return /*#__PURE__*/React.createElement(TextField, _extends({
        value: value,
        select: true,
        label: label,
        onChange: function onChange(ev) {
            return _onChange(ev.target.value);
        },
        className: classes.selectControl,
        style: {
            minWidth: minWidth,
            margin: "8px 0 0 4px"
        }
    }, rest), options.map(function (option) {
        return /*#__PURE__*/React.createElement(MenuItem, {
            key: option.value || 'empty',
            value: option.value
        }, option.text ? translateLiteralWithPrefix(option.text, editor.translate) : '');
    }));
}

DropdownControl.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    minWidth: PropTypes.number
};

function BlockTypeControl(_ref) {
    const configuration = _ref.configuration,
        defaultConfiguration = _ref.defaultConfiguration;
    const editor = useEditor();
    const editorFocus = useEditorFocus();
    const options = configuration.options || defaultConfiguration.options;

    const _React$useState = React.useState('default'),
        value = _React$useState[0],
        setValue = _React$useState[1];

    React.useEffect(function () {
        setValue(getCurrentBlockType(editor.editorState, options.map(function (option) {
            return option.value;
        })));
    }, [editor, options]);

    const handleChange = function handleChange(newValue) {
        setValue(newValue);
        const newEditorState = RichUtils.toggleBlockType(editor.editorState, newValue === 'normal' ? '' : newValue);
        editor.onChange(newEditorState);
        editorFocus();
    };

    return /*#__PURE__*/React.createElement(DropdownControl, {
        options: options,
        onChange: handleChange,
        value: value,
        label: 'Block Type'
    });
}

BlockTypeControl.propTypes = {
    configuration: PropTypes.any,
    defaultConfiguration: PropTypes.any.isRequired
};

ToggleBlockTypeButtonControl.propTypes = {
    blockType: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired,
    text: PropTypes.any
};

function ToggleBlockTypeButtonControl(_ref) {
    const blockType = _ref.blockType,
        children = _ref.children,
        text = _ref.text;
    const editor = useEditor();
    const editorFocus = useEditorFocus();

    const onClick = function onClick() {
        const newEditorState = RichUtils.toggleBlockType(editor.editorState, blockType);
        editor.onChange(newEditorState);
        editorFocus();
    };

    return /*#__PURE__*/React.createElement(ButtonControl, {
        text: text,
        onClick: onClick
    }, children);
}

function UnorderedListControl() {
    const editor = useEditor();
    return /*#__PURE__*/React.createElement(ToggleBlockTypeButtonControl, {
        blockType: "unordered-list-item",
        text: editor.translate('controls.unorderedList.title')
    }, /*#__PURE__*/React.createElement(FormatListBulletedIcon, null));
}

const blockStyles = {
    H1: 'header-one',
    H2: 'header-two',
    H3: 'header-three',
    H4: 'header-four',
    H5: 'header-five',
    H6: 'header-six',
    UL: 'unordered-list-item',
    OL: 'ordered-list-item',
    BLOCKQUOTE: 'blockquote',
    CODE_BLOCK: 'code-block',
    UNSTYLED: 'unstyled',
    ATOMIC: 'atomic'
};

function OrderedListControl() {
    const editor = useEditor();
    return /*#__PURE__*/React.createElement(ToggleBlockTypeButtonControl, {
        blockType: blockStyles.OL,
        text: editor.translate('controls.orderedList.title')
    }, /*#__PURE__*/React.createElement(FormatListNumberedIcon, null));
}

function FontFamilyControl(_ref) {
    const pluginData = _ref.pluginData;
    const editor = useEditor();
    const editorFocus = useEditorFocus();

    const _React$useState = React.useState(inlineStyles.FONT_FAMILY + "-default"),
        selectedFontFamilyStyle = _React$useState[0],
        setSelectedFontFamilyStyle = _React$useState[1];

    const styleKeys = Object.keys(pluginData.customStyleMap);
    React.useEffect(function () {
        setSelectedFontFamilyStyle(getCurrentMappedInlineStyle(editor.editorState, styleKeys, inlineStyles.FONT_FAMILY + "-default"));
    }, [editor.editorState, styleKeys]);

    const handleChange = function handleChange(newInlineStyle) {
        setSelectedFontFamilyStyle(newInlineStyle);
        const newEditorState = toggleMappedInlineStyle(editor.editorState, styleKeys, newInlineStyle);
        editor.onChange(newEditorState);
        editorFocus();
    };

    return /*#__PURE__*/React.createElement(DropdownControl, {
        label: 'Font',
        options: styleKeys.map(function (inlineStyle) {
            return {
                value: inlineStyle,
                text: pluginData.customStyleMap[inlineStyle].fontFamily ? /*#__PURE__*/React.createElement("span", {
                    style: {
                        fontFamily: pluginData.customStyleMap[inlineStyle].fontFamily
                    }
                }, pluginData.customStyleMap[inlineStyle].fontFamily) : 'default'
            };
        }),
        onChange: handleChange,
        value: selectedFontFamilyStyle
    });
}

FontFamilyControl.propTypes = {
    pluginData: PropTypes.any.isRequired
};

const fontFamilyPlugin = function fontFamilyPlugin(configuration, defaultConfiguration) {
    const fontFamilies = configuration.options || defaultConfiguration.options;
    const customStyleMap = {};

    const _iterator = _createForOfIteratorHelperLoose(fontFamilies);
    let _step;
    for (; !(_step = _iterator()).done;) {
        const fontFamily = _step.value;
        customStyleMap[inlineStyles.FONT_FAMILY + "-" + fontFamily] = fontFamily === 'default' ? {} : {
            fontFamily: fontFamily
        };
    }

    return {
        customStyleMap: customStyleMap
    };
};

function TextAlignControl() {
    const editor = useEditor();
    const editorFocus = useEditorFocus();

    const _React$useState = React.useState(null),
        selectedTextAlign = _React$useState[0],
        setSelectedTextAlign = _React$useState[1];

    React.useEffect(function () {
        const selection = editor.editorState.getSelection();
        const currentBlock = editor.editorState.getCurrentContent().getBlockForKey(selection.getStartKey());
        const blockData = currentBlock.getData();

        if (blockData && blockData.get('textAlign')) {
            setSelectedTextAlign(blockData.get('textAlign'));
        } else {
            setSelectedTextAlign(null);
        }
    }, [editor.editorState]);

    const toggle = function toggle(textAlign) {
        setSelectedTextAlign(textAlign);
        const editorState = editor.editorState;
        const newContentState = Modifier.mergeBlockData(editorState.getCurrentContent(), editorState.getSelection(), {
            textAlign: textAlign
        });
        editor.onChange(EditorState.push(editorState, newContentState, 'change-block-data'));
        editorFocus();
    };

    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ButtonControl, {
        active: selectedTextAlign === 'left',
        onClick: function onClick() {
            return toggle('left');
        },
        text: editor.translate('controls.textAlign.actions.alignLeft')
    }, /*#__PURE__*/React.createElement(FormatAlignLeftIcon, null)), /*#__PURE__*/React.createElement(ButtonControl, {
        active: selectedTextAlign === 'center',
        onClick: function onClick() {
            return toggle('center');
        },
        text: editor.translate('controls.textAlign.actions.alignCenter')
    }, /*#__PURE__*/React.createElement(FormatAlignCenterIcon, null)), /*#__PURE__*/React.createElement(ButtonControl, {
        active: selectedTextAlign === 'right',
        onClick: function onClick() {
            return toggle('right');
        },
        text: editor.translate('controls.textAlign.actions.alignRight')
    }, /*#__PURE__*/React.createElement(FormatAlignRightIcon, null)), /*#__PURE__*/React.createElement(ButtonControl, {
        active: selectedTextAlign === 'justify',
        onClick: function onClick() {
            return toggle('justify');
        },
        text: editor.translate('controls.textAlign.actions.justify')
    }, /*#__PURE__*/React.createElement(FormatAlignJustifyIcon, null)));
}

TextAlignControl.propTypes = {};

const textAlignPlugin = function textAlignPlugin() {
    return {
        blockStyleFn: function blockStyleFn(block) {
            const textAlign = block.getData() ? block.getData().get('textAlign') : null;

            if (textAlign) {
                return "mui-editor-" + textAlign + "-aligned-block";
            }

            return '';
        }
    };
};

FontSizeControl.propTypes = {
    pluginData: PropTypes.object.isRequired
};

function FontSizeControl(_ref) {
    const pluginData = _ref.pluginData;
    const editor = useEditor();
    const editorFocus = useEditorFocus();

    const _React$useState = React.useState(inlineStyles.FONT_SIZE + "-default"),
        selectedFontSizeStyle = _React$useState[0],
        setSelectedFontSizeStyle = _React$useState[1];

    const styleKeys = Object.keys(pluginData.customStyleMap);
    React.useEffect(function () {
        setSelectedFontSizeStyle(getCurrentMappedInlineStyle(editor.editorState, styleKeys, inlineStyles.FONT_SIZE + "-default"));
    }, [editor.editorState, styleKeys]);

    const handleChange = function handleChange(newInlineStyle) {
        setSelectedFontSizeStyle(newInlineStyle);
        const newEditorState = toggleMappedInlineStyle(editor.editorState, styleKeys, newInlineStyle);
        editor.onChange(newEditorState);
        editorFocus();
    };

    return /*#__PURE__*/React.createElement(DropdownControl, {
        label: 'Font Size',
        options: styleKeys.map(function (inlineStyle) {
            return {
                text: pluginData.customStyleMap[inlineStyle].fontSize ? /*#__PURE__*/React.createElement("span", {
                    style: {
                        // fontSize: pluginData.customStyleMap[inlineStyle].fontSize
                    }
                }, pluginData.customStyleMap[inlineStyle].fontSize) : 'default',
                value: inlineStyle
            };
        }),
        onChange: handleChange,
        value: selectedFontSizeStyle,
        minWidth: 50
    });
}

const fontSizePlugin = function fontSizePlugin(configuration, defaultConfiguration) {
    const fontSizes = configuration.options || defaultConfiguration.options;
    const customStyleMap = {};

    const _iterator = _createForOfIteratorHelperLoose(fontSizes);
    let _step;
    for (; !(_step = _iterator()).done;) {
        const fontSize = _step.value;
        customStyleMap[inlineStyles.FONT_SIZE + "-" + fontSize] = fontSize === 'default' ? {} : {
            fontSize: fontSize
        };
    }

    return {
        customStyleMap: customStyleMap
    };
};

const isLightOrDark = function isLightOrDark(color) {
    let r, g, b;

    if (color.match(/^rgb/)) {
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
        r = color[1];
        g = color[2];
        b = color[3];
    } else {
        color = +('0x' + color.slice(1).replace(color.length < 5 && /./g, '$&$&'));
        r = color >> 16;
        g = color >> 8 & 255;
        b = color & 255;
    }

    const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

    if (hsp > 127.5) {
        return 'light';
    } else {
        return 'dark';
    }
};

const useStyles$2 = makeStyles({
    colorRow: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    colorItem: {
        height: 25,
        width: 25,
        borderRadius: '50%',
        margin: 3,
        border: 'solid 1px #c4c4c4',
        cursor: 'pointer',
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center'
    }
});

function ColorSelectorControl(_ref) {
    const selectedColor = _ref.selectedColor,
        onSelectColor = _ref.onSelectColor,
        colors = _ref.colors,
        _ref$colorsPerRow = _ref.colorsPerRow,
        colorsPerRow = _ref$colorsPerRow === void 0 ? 10 : _ref$colorsPerRow,
        children = _ref.children,
        rest = _objectWithoutPropertiesLoose(_ref, ["selectedColor", "onSelectColor", "colors", "colorsPerRow", "children"]);

    const classes = useStyles$2();

    const _React$useState = React.useState(null),
        anchorEl = _React$useState[0],
        setAnchorEl = _React$useState[1];

    const menuId = Math.random().toString(36).substring(8);
    const colorRows = [[]];

    let i = 0, rowI = 0;
    for (; i < colors.length; i++) {
        if (i % colorsPerRow === 0) {
            rowI++;
            colorRows[rowI] = [];
        }

        colorRows[rowI].push(colors[i]);
    }

    const handleOpen = function handleOpen(ev) {
        setAnchorEl(ev.currentTarget);
    };

    const handleClose = function handleClose() {
        setAnchorEl(null);
    };

    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ButtonControl, _extends({
        onClick: handleOpen,
        "aria-controls": menuId,
        "aria-haspopup": "true",
        badgeColor: selectedColor ? selectedColor.color : null
    }, rest), children), /*#__PURE__*/React.createElement(Popover, {
        id: menuId,
        anchorEl: anchorEl,
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left'
        },
        transformOrigin: {
            vertical: 'top',
            horizontal: 'left'
        },
        keepMounted: true,
        open: Boolean(anchorEl),
        onClose: handleClose
    }, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
        startIcon: /*#__PURE__*/React.createElement(FormatColorResetIcon, null),
        fullWidth: true,
        color: "secondary",
        onClick: function onClick() {
            handleClose();
            onSelectColor(null);
        }
    }, "None"), colorRows.map(function (colorRow, colorRowI) {
        return /*#__PURE__*/React.createElement("div", {
            key: "color-row-" + colorRowI,
            className: classes.colorRow
        }, colorRow.map(function (colorData) {
            return /*#__PURE__*/React.createElement(Tooltip, {
                key: colorData.value,
                title: colorData.text
            }, /*#__PURE__*/React.createElement("div", {
                onClick: function onClick() {
                    handleClose();
                    onSelectColor(colorData);
                },
                className: classes.colorItem,
                style: {
                    backgroundColor: colorData.color
                }
            }, selectedColor && colorData.value === selectedColor.value ? /*#__PURE__*/React.createElement(CheckIcon, {
                style: {
                    color: isLightOrDark(colorData.color) === 'dark' ? '#fff' : '#000'
                }
            }) : null));
        }));
    }))));
}

ColorSelectorControl.propTypes = {
    selectedColor: PropTypes.object,
    onSelectColor: PropTypes.func.isRequired,
    colors: PropTypes.array.isRequired,
    colorsPerRow: PropTypes.number,
    children: PropTypes.any
};

function ToggleInlineStyleColorSelectorControl(_ref) {
    const configuration = _ref.configuration,
        defaultConfiguration = _ref.defaultConfiguration,
        pluginData = _ref.pluginData,
        colorCssProp = _ref.colorCssProp,
        inlineStyle = _ref.inlineStyle,
        text = _ref.text,
        children = _ref.children;
    const editor = useEditor();
    const editorFocus = useEditorFocus();

    const _React$useState = React.useState(null),
        selectedColor = _React$useState[0],
        setSelectedColor = _React$useState[1];

    const options = configuration.options || defaultConfiguration.options;
    React.useEffect(function () {
        const selectededInlineStyle = getCurrentMappedInlineStyle(editor.editorState, Object.keys(pluginData.customStyleMap), null);
        setSelectedColor(selectededInlineStyle && pluginData.customStyleMap[selectededInlineStyle] ? {
            color: pluginData.customStyleMap[selectededInlineStyle][colorCssProp],
            value: selectededInlineStyle
        } : null);
    }, [editor.editorState, pluginData.customStyleMap, colorCssProp]);

    const handleSelectColor = function handleSelectColor(selectedColorData) {
        setSelectedColor(selectedColorData);
        const newEditorState = toggleMappedInlineStyle(editor.editorState, Object.keys(pluginData.customStyleMap), selectedColorData ? selectedColorData.value : '');
        editor.onChange(newEditorState);
        editorFocus();
    };

    return /*#__PURE__*/React.createElement(ColorSelectorControl, {
        text: text,
        onSelectColor: handleSelectColor,
        selectedColor: selectedColor,
        colorsPerRow: configuration.colorsPerRow || defaultConfiguration.colorsPerRow,
        disabled: editor.editorState.getSelection().isCollapsed(),
        colors: options.map(function (option) {
            return {
                text: option.text,
                color: option.value,
                value: inlineStyle + "-" + option.value
            };
        })
    }, children);
}

ToggleInlineStyleColorSelectorControl.propTypes = {
    configuration: PropTypes.object,
    defaultConfiguration: PropTypes.object.isRequired,
    pluginData: PropTypes.object.isRequired,
    colorCssProp: PropTypes.string.isRequired,
    inlineStyle: PropTypes.string.isRequired,
    text: PropTypes.string,
    children: PropTypes.any
};

function FontColorControl(_ref) {
    const configuration = _ref.configuration,
        defaultConfiguration = _ref.defaultConfiguration,
        pluginData = _ref.pluginData;
    const editor = useEditor();
    return /*#__PURE__*/React.createElement(ToggleInlineStyleColorSelectorControl, {
        text: editor.translate('controls.fontColor.title'),
        configuration: configuration,
        defaultConfiguration: defaultConfiguration,
        inlineStyle: inlineStyles.FONT_COLOR,
        pluginData: pluginData,
        colorCssProp: "color"
    }, /*#__PURE__*/React.createElement(FormatColorTextIcon, null));
}

FontColorControl.propTypes = {
    configuration: PropTypes.object,
    defaultConfiguration: PropTypes.object.isRequired,
    pluginData: PropTypes.object.isRequired
};

const fontColorPlugin = function fontColorPlugin(configuration, defaultConfiguration) {
    const fontColors = configuration.options || defaultConfiguration.options;
    const customStyleMap = {};

    const _iterator = _createForOfIteratorHelperLoose(fontColors);
    let _step;
    for (; !(_step = _iterator()).done;) {
        const fontColor = _step.value;
        customStyleMap[inlineStyles.FONT_COLOR + "-" + fontColor.value] = {
            color: fontColor.value
        };
    }

    return {
        customStyleMap: customStyleMap
    };
};

function FontBackgroundColorControl(_ref) {
    const configuration = _ref.configuration,
        defaultConfiguration = _ref.defaultConfiguration,
        pluginData = _ref.pluginData;
    const editor = useEditor();
    return /*#__PURE__*/React.createElement(ToggleInlineStyleColorSelectorControl, {
        text: editor.translate('controls.fontBackgroundColor.title'),
        configuration: configuration,
        defaultConfiguration: defaultConfiguration,
        inlineStyle: inlineStyles.FONT_BACKGROUND,
        pluginData: pluginData,
        colorCssProp: "backgroundColor"
    }, /*#__PURE__*/React.createElement(BorderColorIcon, null));
}

FontBackgroundColorControl.propTypes = {
    configuration: PropTypes.object,
    defaultConfiguration: PropTypes.object.isRequired,
    pluginData: PropTypes.object.isRequired
};

const fontBackgroundColorPlugin = function fontBackgroundColorPlugin(configuration, defaultConfiguration) {
    const fontBgs = configuration.options || defaultConfiguration.options;
    const customStyleMap = {};

    const _iterator = _createForOfIteratorHelperLoose(fontBgs);
    let _step;
    for (; !(_step = _iterator()).done;) {
        const fontBg = _step.value;
        customStyleMap[inlineStyles.FONT_BACKGROUND + "-" + fontBg.value] = {
            backgroundColor: fontBg.value
        };
    }

    return {
        customStyleMap: customStyleMap
    };
};

const useStyles$3 = makeStyles(function (theme) {
    return {
        imgWrapper: {
            maxWidth: '100%',
            maxHeight: 300,
            overflow: 'auto',
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2)
        }
    };
});

function ImageToUpload(_ref) {
    const width = _ref.width,
        height = _ref.height,
        src = _ref.src;
    const classes = useStyles$3();
    return /*#__PURE__*/React.createElement("div", {
        className: classes.imgWrapper
    }, /*#__PURE__*/React.createElement("img", {
        alt: "",
        width: width,
        height: height,
        src: src
    }));
}

ImageToUpload.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired
};

function SizeInputs(_ref) {
    const originalWidth = _ref.originalWidth,
        originalHeight = _ref.originalHeight,
        width = _ref.width,
        height = _ref.height,
        onChangeWidth = _ref.onChangeWidth,
        onChangeHeight = _ref.onChangeHeight;
    const editor = useEditor();

    const _React$useState = React.useState(true),
        maintainAspectRatio = _React$useState[0],
        setMaintainAspectRatio = _React$useState[1];

    const aspectRatio = originalWidth / originalHeight;

    const handleChangeWidth = function handleChangeWidth(ev) {
        ev.stopPropagation();
        const value = ev.currentTarget.value;
        const w = value === '' || isNaN(value) ? 0 : parseInt(value);
        onChangeWidth(w);

        if (maintainAspectRatio) {
            onChangeHeight(Math.round(w / aspectRatio));
        }
    };

    const handleChangeHeight = function handleChangeHeight(ev) {
        ev.stopPropagation();
        const value = ev.currentTarget.value;
        const h = value === '' || isNaN(value) ? 0 : parseInt(value);
        onChangeHeight(h);

        if (maintainAspectRatio) {
            onChangeWidth(Math.round(h * aspectRatio));
        }
    };

    const handleClickAspectRatio = function handleClickAspectRatio() {
        const newMaintainAspectRatio = !maintainAspectRatio;
        setMaintainAspectRatio(newMaintainAspectRatio);

        if (newMaintainAspectRatio) {
            onChangeHeight(Math.round(width / aspectRatio));
        }
    };

    return /*#__PURE__*/React.createElement(Grid, {
        container: true,
        direction: "row",
        justify: "flex-end",
        alignItems: "center",
        spacing: 2
    }, /*#__PURE__*/React.createElement(Grid, {
        item: true
    }, /*#__PURE__*/React.createElement(TextField, {
        type: "number",
        label: editor.translate('controls.image.labels.width'),
        size: "small",
        value: width,
        onChange: handleChangeWidth,
        onClick: function onClick(ev) {
            return ev.stopPropagation();
        },
        style: {
            maxWidth: 90
        }
    })), /*#__PURE__*/React.createElement(Grid, {
        item: true
    }, /*#__PURE__*/React.createElement(IconButton, {
        onClick: handleClickAspectRatio,
        size: "small"
    }, maintainAspectRatio ? /*#__PURE__*/React.createElement(LockIcon, null) : /*#__PURE__*/React.createElement(LockOpenIcon, null))), /*#__PURE__*/React.createElement(Grid, {
        item: true
    }, /*#__PURE__*/React.createElement(TextField, {
        type: "number",
        label: editor.translate('controls.image.labels.height'),
        size: "small",
        value: height,
        onChange: handleChangeHeight,
        onClick: function onClick(ev) {
            return ev.stopPropagation();
        },
        style: {
            maxWidth: 90
        }
    })));
}

SizeInputs.propTypes = {
    originalWidth: PropTypes.number.isRequired,
    originalHeight: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    onChangeWidth: PropTypes.func.isRequired,
    onChangeHeight: PropTypes.func.isRequired
};

function ByUrlDialog(_ref) {
    const open = _ref.open,
        onClose = _ref.onClose,
        onSubmit = _ref.onSubmit;
    const editor = useEditor();

    const _React$useState = React.useState(''),
        imageURL = _React$useState[0],
        setImageURL = _React$useState[1];

    const _React$useState2 = React.useState(0),
        imageWidth = _React$useState2[0],
        setImageWidth = _React$useState2[1];

    const _React$useState3 = React.useState(0),
        imageOriginalWidth = _React$useState3[0],
        setImageOriginalWidth = _React$useState3[1];

    const _React$useState4 = React.useState(0),
        imageHeight = _React$useState4[0],
        setImageHeight = _React$useState4[1];

    const _React$useState5 = React.useState(0),
        imageOriginalHeight = _React$useState5[0],
        setImageOriginalHeight = _React$useState5[1];

    const _React$useState6 = React.useState(false),
        isUploading = _React$useState6[0],
        setIsUploading = _React$useState6[1];

    const _React$useState7 = React.useState(false),
        isValidImage = _React$useState7[0],
        setIsValidImage = _React$useState7[1];

    const _React$useState8 = React.useState(false),
        hasError = _React$useState8[0],
        setHasError = _React$useState8[1];

    const _React$useState9 = React.useState(null),
        changeTimeout = _React$useState9[0],
        setChangeTimeout = _React$useState9[1];

    const handleSubmit = function handleSubmit(ev) {
        ev.preventDefault();
        onSubmit({
            imageURL: imageURL,
            imageWidth: imageWidth,
            imageHeight: imageHeight
        });
    };

    const resetForm = function resetForm() {
        setIsValidImage(false);
        setImageURL('');
    };

    const handleURLChange = function handleURLChange(url) {
        setImageURL(url);

        if (changeTimeout) {
            clearTimeout(changeTimeout);
            setChangeTimeout(null);
        }

        if (url === '') {
            setHasError(false);
            setIsValidImage(false);
            return;
        }

        const to = setTimeout(function () {
            setIsUploading(true);
            const image = new Image();

            image.onload = function () {
                setImageWidth(this.width);
                setImageOriginalWidth(this.width);
                setImageHeight(this.height);
                setImageOriginalHeight(this.height);
                setIsUploading(false);
                setIsValidImage(true);
                setHasError(false);
            };

            image.onerror = function () {
                setIsUploading(false);
                setIsValidImage(false);
                setHasError(true);
            };

            image.src = url;
            setChangeTimeout(null);
        }, 1000);
        setChangeTimeout(to);
    };

    let content = null;
    if (isUploading) content = /*#__PURE__*/React.createElement(CircularProgress, null); else if (isValidImage && imageURL) content = /*#__PURE__*/React.createElement(ImageToUpload, {
        src: imageURL,
        height: imageHeight,
        width: imageWidth
    }); else if (hasError && !isValidImage && imageURL) content = /*#__PURE__*/React.createElement(Typography, {
        variant: "subtitle1",
        color: "error",
        gutterBottom: true
    }, editor.translate('controls.image.errorMessages.notValidImage'));
    return /*#__PURE__*/React.createElement(Dialog, {
        open: open,
        onClose: onClose,
        onEnter: resetForm
    }, /*#__PURE__*/React.createElement("form", {
        onSubmit: handleSubmit
    }, /*#__PURE__*/React.createElement(DialogContent, null, isValidImage && imageURL !== '' && /*#__PURE__*/React.createElement(SizeInputs, {
        width: imageWidth,
        onChangeHeight: setImageHeight,
        height: imageHeight,
        originalWidth: imageOriginalWidth,
        originalHeight: imageOriginalHeight,
        onChangeWidth: setImageWidth
    }), /*#__PURE__*/React.createElement(Grid, {
        container: true,
        alignItems: "center",
        justify: "center"
    }, content), /*#__PURE__*/React.createElement(TextField, {
        autoFocus: true,
        label: editor.translate('controls.image.labels.url'),
        value: imageURL,
        onChange: function onChange(ev) {
            return handleURLChange(ev.currentTarget.value);
        },
        fullWidth: true
    })), /*#__PURE__*/React.createElement(DialogActions, null, /*#__PURE__*/React.createElement(Button, {
        type: "button",
        onClick: onClose,
        color: "primary"
    }, editor.translate('controls.image.actions.cancel')), /*#__PURE__*/React.createElement(Button, {
        type: "submit",
        color: "primary",
        disabled: !isValidImage
    }, editor.translate('controls.image.actions.add')))));
}

ByUrlDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

// A type of promise-like that resolves synchronously and supports only one observer

const _iteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))) : "@@iterator";

const _asyncIteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"))) : "@@asyncIterator";

// Asynchronously call a function and send errors to recovery continuation
function _catch(body, recover) {
    try {
        var result = body();
    } catch (e) {
        return recover(e);
    }
    if (result && result.then) {
        return result.then(void 0, recover);
    }
    return result;
}

const useStyles$4 = makeStyles(function (theme) {
    return {
        dropArea: function dropArea(_ref) {
            const highlightDropArea = _ref.highlightDropArea;
            return {
                width: 500,
                height: 300,
                boxSizing: 'border-box',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: theme.spacing(2),
                marginTop: theme.spacing(1),
                marginBottom: theme.spacing(2),
                borderRadius: theme.shape.borderRadius || 4,
                backgroundColor: highlightDropArea ? theme.palette.grey[400] || '#bdbdbd' : theme.palette.grey[200] || '#eeeeee',
                border: highlightDropArea ? "solid 3px " + (theme.palette.grey[600] || '#757575') : "dashed 3px " + (theme.palette.grey[400] || '#bdbdbd'),
                color: theme.palette.text.hint || 'rgba(0, 0, 0, 0.38)',
                cursor: 'pointer'
            };
        }
    };
});

function UploadDialog(_ref2) {
    const open = _ref2.open,
        onClose = _ref2.onClose,
        onSubmit = _ref2.onSubmit,
        uploadCallback = _ref2.uploadCallback;
    const editor = useEditor();

    const _React$useState = React.useState(''),
        imageURL = _React$useState[0],
        setImageURL = _React$useState[1];

    const _React$useState2 = React.useState(0),
        imageWidth = _React$useState2[0],
        setImageWidth = _React$useState2[1];

    const _React$useState3 = React.useState(0),
        imageOriginalWidth = _React$useState3[0],
        setImageOriginalWidth = _React$useState3[1];

    const _React$useState4 = React.useState(0),
        imageHeight = _React$useState4[0],
        setImageHeight = _React$useState4[1];

    const _React$useState5 = React.useState(0),
        imageOriginalHeight = _React$useState5[0],
        setImageOriginalHeight = _React$useState5[1];

    const _React$useState6 = React.useState(false),
        isUploading = _React$useState6[0],
        setIsUploading = _React$useState6[1];

    const _React$useState7 = React.useState(false),
        isValidImage = _React$useState7[0],
        setIsValidImage = _React$useState7[1];

    const _React$useState8 = React.useState(false),
        hasError = _React$useState8[0],
        setHasError = _React$useState8[1];

    const _React$useState9 = React.useState(null),
        errorMessage = _React$useState9[0],
        setErrorMessage = _React$useState9[1];

    const _React$useState10 = React.useState(false),
        highlightDropArea = _React$useState10[0],
        setHighlightDropArea = _React$useState10[1];

    const inputFileRef = React.createRef();
    const classes = useStyles$4({
        highlightDropArea: highlightDropArea
    });

    const handleSubmit = function handleSubmit(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        onSubmit({
            imageURL: imageURL,
            imageWidth: imageWidth,
            imageHeight: imageHeight
        });
    };

    const handleClickDropArea = function handleClickDropArea(ev) {
        ev.preventDefault();
        inputFileRef.current.click();
    };

    const handleDragEnter = function handleDragEnter(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        setHighlightDropArea(true);
    };

    const handleDragLeave = function handleDragLeave(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        setHighlightDropArea(false);
    };

    const handleDragOver = function handleDragOver(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        setHighlightDropArea(true);
    };

    const handleDrop = function handleDrop(ev) {
        try {
            ev.preventDefault();
            ev.stopPropagation();
            const files = ev.dataTransfer.files;

            const _temp2 = function () {
                if (files.length > 0) return Promise.resolve(onSelectFile(files[0])).then(function () {
                });
            }();

            return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function () {
            }) : void 0);
        } catch (e) {
            return Promise.reject(e);
        }
    };
    const handlePaste = (ev) => {
        try {
            ev.preventDefault();
            ev.stopPropagation();
            const dT = ev.clipboardData || window.clipboardData;
            const files = dT.files;

            const _temp2 = function () {
                if (files.length > 0) return Promise.resolve(onSelectFile(files[0])).then(function () {
                });
            }();

            return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function () {
            }) : void 0);
        } catch (e) {
            return Promise.reject(e);
        }
    };


    const handleInputFileChange = function handleInputFileChange() {
        try {
            const files = inputFileRef.current.files;

            const _temp4 = function () {
                if (files.length > 0) return Promise.resolve(onSelectFile(files[0])).then(function () {
                });
            }();

            return Promise.resolve(_temp4 && _temp4.then ? _temp4.then(function () {
            }) : void 0);
        } catch (e) {
            return Promise.reject(e);
        }
    };


    var onSelectFile = function onSelectFile(file) {
        try {
            setHighlightDropArea(false);
            setIsUploading(true);

            const _temp6 = _catch(function () {
                return Promise.resolve(uploadCallback(file)).then(function (selectedImageUrl) {
                    setImageURL(selectedImageUrl);
                    const image = new Image();


                    image.onload = function () {
                        const ratio = this.height / this.width;
                        const width = Math.min(this.width, 800)
                        const height = Math.floor(ratio * width)

                        setImageWidth(width);
                        setImageOriginalWidth(this.width);
                        setImageHeight(height);
                        setImageOriginalHeight(height);
                        setIsUploading(false);
                        setIsValidImage(true);
                        setHasError(false);
                    };

                    image.onerror = function () {
                        setIsUploading(false);
                        setIsValidImage(false);
                        setHasError(true);
                        setErrorMessage(null);
                    };

                    image.src = selectedImageUrl;
                });
            }, function (e) {
                setIsUploading(false);
                setIsValidImage(false);
                setHasError(true);
                setErrorMessage(e);
            });

            return Promise.resolve(_temp6 && _temp6.then ? _temp6.then(function () {
            }) : void 0);
        } catch (e) {
            return Promise.reject(e);
        }
    };

    const resetForm = function resetForm() {
        setImageURL('');
        setIsValidImage(false);
        setIsUploading(false);
        setHighlightDropArea(false);
    };

    let dropAreaContent = /*#__PURE__*/React.createElement(Typography, {
        variant: "subtitle1"
    }, editor.translate('controls.image.labels.dropImageHere'));

    if (isUploading) {
        dropAreaContent = /*#__PURE__*/React.createElement(CircularProgress, null);
    } else if (isValidImage && imageURL) {
        dropAreaContent = /*#__PURE__*/React.createElement(ImageToUpload, {
            src: imageURL,
            height: imageHeight,
            width: imageWidth
        });
    }

    return /*#__PURE__*/React.createElement(Dialog, {
        open: open,
        onClose: onClose,
        onEnter: resetForm
    }, /*#__PURE__*/React.createElement("form", {
        onSubmit: handleSubmit
    }, /*#__PURE__*/React.createElement(DialogContent, null, /*#__PURE__*/React.createElement("input", {
        ref: inputFileRef,
        type: "file",
        accept: "image/*",
        onChange: handleInputFileChange,
        style: {
            display: 'none'
        }
    }), isValidImage && imageURL !== '' && /*#__PURE__*/React.createElement(SizeInputs, {
        originalWidth: imageOriginalWidth,
        originalHeight: imageOriginalHeight,
        width: imageWidth,
        height: imageHeight,
        onChangeWidth: setImageWidth,
        onChangeHeight: setImageHeight
    }), hasError && !isValidImage && /*#__PURE__*/React.createElement(Typography, {
        variant: "subtitle1",
        color: "error",
        align: "center",
        gutterBottom: true
    }, errorMessage !== null ? errorMessage : editor.translate('controls.image.errorMessages.notValidImage')), /*#__PURE__*/React.createElement("div", {
        className: classes.dropArea,
        onClick: handleClickDropArea,
        onDragEnter: handleDragEnter,
        onDragLeave: handleDragLeave,
        onDragOver: handleDragOver,
        onDrop: handleDrop,
        onPaste: handlePaste
    }, dropAreaContent)), /*#__PURE__*/React.createElement(DialogActions, null, /*#__PURE__*/React.createElement(Button, {
        type: "button",
        onClick: onClose,
        color: "primary"
    }, editor.translate('controls.image.actions.cancel')), /*#__PURE__*/React.createElement(Button, {
        type: "submit",
        color: "primary",
        disabled: !isValidImage
    }, editor.translate('controls.image.actions.add')))));
}

UploadDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    uploadCallback: PropTypes.func.isRequired
};

function ResizeImageDialog(_ref) {
    const open = _ref.open,
        onClose = _ref.onClose,
        src = _ref.src,
        originalWidth = _ref.originalWidth,
        originalHeight = _ref.originalHeight,
        onSave = _ref.onSave;

    const _React$useState = React.useState(0),
        width = _React$useState[0],
        setWidth = _React$useState[1];

    const _React$useState2 = React.useState(0),
        height = _React$useState2[0],
        setHeight = _React$useState2[1];

    const editor = useEditor();
    React.useEffect(function () {
        setWidth(originalWidth);
        setHeight(originalHeight);
    }, [originalWidth, originalHeight]);

    const handleSubmit = function handleSubmit(ev) {
        ev.preventDefault();
        onSave(width, height);
    };

    return /*#__PURE__*/React.createElement(Dialog, {
        open: open,
        onClose: onClose
    }, /*#__PURE__*/React.createElement("form", {
        onSubmit: handleSubmit
    }, /*#__PURE__*/React.createElement(DialogContent, null, /*#__PURE__*/React.createElement(SizeInputs, {
        width: width,
        height: height,
        onChangeWidth: setWidth,
        onChangeHeight: setHeight,
        originalWidth: originalWidth,
        originalHeight: originalHeight
    }), /*#__PURE__*/React.createElement(Grid, {
        container: true,
        alignItems: "center",
        justify: "center"
    }, /*#__PURE__*/React.createElement(ImageToUpload, {
        src: src,
        width: width,
        height: height
    }))), /*#__PURE__*/React.createElement(DialogActions, null, /*#__PURE__*/React.createElement(Button, {
        type: "button",
        onClick: function onClick() {
            return onClose();
        }
    }, editor.translate('controls.image.actions.cancel')), /*#__PURE__*/React.createElement(Button, {
        type: "submit"
    }, editor.translate('controls.image.actions.resize')))));
}

ResizeImageDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    src: PropTypes.string.isRequired,
    originalWidth: PropTypes.number.isRequired,
    originalHeight: PropTypes.number.isRequired,
    onSave: PropTypes.func.isRequired
};

function ImageControl(_ref) {
    const configuration = _ref.configuration,
        defaultConfiguration = _ref.defaultConfiguration;
    const editor = useEditor();
    const editorFocus = useEditorFocus();
    const menuId = Math.random().toString(36).substring(8);

    const _React$useState = React.useState(null),
        anchorEl = _React$useState[0],
        setAnchorEl = _React$useState[1];

    const _React$useState2 = React.useState(false),
        isUploadDialogOpened = _React$useState2[0],
        setIsUploadDialogOpened = _React$useState2[1];

    const _React$useState3 = React.useState(false),
        isUrlDialogOpened = _React$useState3[0],
        setIsUrlDialogOpened = _React$useState3[1];

    const uploadCallback = configuration.uploadCallback || defaultConfiguration.uploadCallback;
    const imageEntityToResize = editor.resizeImageEntityKey ? editor.editorState.getCurrentContent().getEntity(editor.resizeImageEntityKey) : null;

    const handleSubmitImage = function handleSubmitImage(_ref2) {
        const imageURL = _ref2.imageURL,
            imageWidth = _ref2.imageWidth,
            imageHeight = _ref2.imageHeight;
        if (imageURL === '') return;
        setIsUrlDialogOpened(false);
        setIsUploadDialogOpened(false);
        const contentState = editor.editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(entities.IMAGE, 'IMMUTABLE', {
            src: imageURL,
            width: imageWidth,
            height: imageHeight
        });
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.push(editor.editorState, contentStateWithEntity, 'apply-entity');
        editor.onChange(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '));
        editorFocus();
    };

    const handleResizeImage = function handleResizeImage(width, height) {
        editor.hideResizeImageDialog();
        const contentState = editor.editorState.getCurrentContent();
        const newEditorState = EditorState.push(editor.editorState, contentState.mergeEntityData(editor.resizeImageEntityKey, {
            width: width,
            height: height
        }), 'apply-entity');
        editor.onChange(newEditorState);
        editorFocus();
    };

    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ButtonControl, {
        onClick: function onClick(ev) {
            return setAnchorEl(ev.currentTarget);
        },
        text: editor.translate('controls.image.title'),
        "aria-controls": menuId,
        "aria-haspopup": "true"
    }, /*#__PURE__*/React.createElement(ImageIcon, null)), /*#__PURE__*/React.createElement(Popover, {
        id: menuId,
        anchorEl: anchorEl,
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left'
        },
        transformOrigin: {
            vertical: 'top',
            horizontal: 'left'
        },
        keepMounted: true,
        open: Boolean(anchorEl),
        onClose: function onClose() {
            return setAnchorEl(null);
        }
    }, /*#__PURE__*/React.createElement(List, {
        component: "nav",
        "aria-label": editor.translate('controls.image.labels.insertOptions')
    }, /*#__PURE__*/React.createElement(ListItem, {
        button: true,
        onClick: function onClick() {
            setIsUploadDialogOpened(true);
            setAnchorEl(null);
        }
    }, /*#__PURE__*/React.createElement(ListItemIcon, null, /*#__PURE__*/React.createElement(PublishIcon, null)), /*#__PURE__*/React.createElement(ListItemText, {
        primary: editor.translate('controls.image.actions.upload')
    })), /*#__PURE__*/React.createElement(ListItem, {
        button: true,
        onClick: function onClick() {
            setIsUrlDialogOpened(true);
            setAnchorEl(null);
        }
    }, /*#__PURE__*/React.createElement(ListItemIcon, null, /*#__PURE__*/React.createElement(LinkIcon, null)), /*#__PURE__*/React.createElement(ListItemText, {
        primary: editor.translate('controls.image.actions.url')
    })))), /*#__PURE__*/React.createElement(ByUrlDialog, {
        onSubmit: handleSubmitImage,
        onClose: function onClose() {
            window.clipboardData = undefined
            return setIsUrlDialogOpened(false);
        },
        open: isUrlDialogOpened
    }), /*#__PURE__*/React.createElement(UploadDialog, {
        onSubmit: handleSubmitImage,
        onClose: function onClose() {
            return setIsUploadDialogOpened(false);
        },
        open: isUploadDialogOpened,
        uploadCallback: uploadCallback
    }), /*#__PURE__*/React.createElement(ResizeImageDialog, {
        open: editor.isResizeImageDialogVisible,
        onClose: function onClose() {
            return editor.hideResizeImageDialog();
        },
        src: imageEntityToResize ? imageEntityToResize.getData().src : '',
        originalWidth: imageEntityToResize ? imageEntityToResize.getData().width : 0,
        originalHeight: imageEntityToResize ? imageEntityToResize.getData().height : 0,
        onSave: handleResizeImage
    }));
}

ImageControl.propTypes = {
    configuration: PropTypes.object.isRequired,
    defaultConfiguration: PropTypes.object.isRequired
};

const EditorMedia = function EditorMedia(_ref) {
    const contentState = _ref.contentState,
        block = _ref.block;
    const entity = contentState.getEntity(block.getEntityAt(0));
    const type = entity.getType();

    if (type === entities.IMAGE) {
        const _entity$getData = entity.getData(),
            src = _entity$getData.src,
            _entity$getData$width = _entity$getData.width,
            width = _entity$getData$width === void 0 ? 'auto' : _entity$getData$width,
            _entity$getData$heigh = _entity$getData.height,
            height = _entity$getData$heigh === void 0 ? 'auto' : _entity$getData$heigh;

        return /*#__PURE__*/React.createElement(EditorImage, {
            src: src,
            width: width,
            height: height,
            block: block,
            contentState: contentState
        });
    }

    return null;
};

EditorMedia.propTypes = {
    contentState: PropTypes.object.isRequired,
    block: PropTypes.object.isRequired
};
const useStyles$5 = makeStyles(function (theme) {
    return {
        imgInfo: {
            padding: theme.spacing(0.6)
        }
    };
});

var EditorImage = function EditorImage(_ref2) {
    const src = _ref2.src,
        width = _ref2.width,
        height = _ref2.height,
        contentState = _ref2.contentState,
        block = _ref2.block;

    const _React$useState = React.useState(null),
        anchorEl = _React$useState[0],
        setAnchorEl = _React$useState[1];

    const _React$useState2 = React.useState(null),
        infoAnchorEl = _React$useState2[0],
        setInfoAnchorEl = _React$useState2[1];

    const editor = useEditor();
    const editorFocus = useEditorFocus();
    const classes = useStyles$5();

    const showOptions = function showOptions(ev) {
        setAnchorEl(ev.currentTarget);
        setInfoAnchorEl(ev.currentTarget);
    };

    const hideOptions = function hideOptions() {
        setAnchorEl(null);
        setInfoAnchorEl(null);
    };

    const imageAlign = function imageAlign(ev, align) {
        ev.preventDefault();
        ev.stopPropagation();
        const imageSelection = SelectionState.createEmpty(block.getKey()).merge({
            anchorKey: block.getKey(),
            anchorOffset: 0,
            focusKey: block.getKey(),
            focusOffset: block.getLength()
        });
        const newContentState = Modifier.setBlockData(contentState, imageSelection, {
            textAlign: align
        });
        editor.onChange(EditorState.push(editor.editorState, newContentState, 'change-block-data'));
        editorFocus();
    };

    const removeImage = function removeImage(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        const imageSelection = SelectionState.createEmpty(block.getKey()).merge({
            anchorKey: block.getKey(),
            anchorOffset: 0,
            focusKey: block.getKey(),
            focusOffset: block.getLength()
        });
        let newContentState = Modifier.removeRange(contentState, imageSelection, 'forward');
        const blockMap = newContentState.getBlockMap()["delete"](block.getKey());
        const firstBlock = newContentState.getFirstBlock();
        const selectionToStart = SelectionState.createEmpty(firstBlock.getKey()).merge({
            anchorKey: firstBlock.getKey(),
            anchorOffset: 0,
            focusKey: firstBlock.getKey(),
            focusOffset: 0
        });
        newContentState = newContentState.merge({
            blockMap: blockMap,
            selectionAfter: selectionToStart
        });
        editor.onChange(EditorState.push(editor.editorState, newContentState, 'remove-range'));
        editorFocus();
    };

    if (!src) return null;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("img", {
        alt: src,
        src: src,
        width: width,
        height: height,
        onClick: showOptions
    }), /*#__PURE__*/React.createElement(Popover, {
        open: Boolean(infoAnchorEl),
        onClose: hideOptions,
        anchorEl: infoAnchorEl,
        anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
        },
        transformOrigin: {
            vertical: 'bottom',
            horizontal: 'right'
        }
    }, /*#__PURE__*/React.createElement(Typography, {
        color: "textSecondary",
        variant: "body1",
        className: classes.imgInfo
    }, width, "\xA0x\xA0", height)), /*#__PURE__*/React.createElement(Popover, {
        open: Boolean(anchorEl),
        onClose: hideOptions,
        anchorEl: anchorEl,
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center'
        },
        transformOrigin: {
            vertical: 'top',
            horizontal: 'center'
        }
    }, /*#__PURE__*/React.createElement(ButtonGroup, {
        size: "small",
        "aria-label": editor.translate('controls.image.labels.editOptions')
    }, /*#__PURE__*/React.createElement(Button, {
        onClick: function onClick(ev) {
            return imageAlign(ev, 'left');
        },
        title: editor.translate('controls.image.actions.alignLeft')
    }, /*#__PURE__*/React.createElement(ArrowLeftIcon, null), /*#__PURE__*/React.createElement(ImageIcon, null)), /*#__PURE__*/React.createElement(Button, {
        onClick: function onClick(ev) {
            return imageAlign(ev, 'center');
        },
        title: editor.translate('controls.image.actions.alignCenter')
    }, /*#__PURE__*/React.createElement(ArrowLeftIcon, null), /*#__PURE__*/React.createElement(ImageIcon, null), /*#__PURE__*/React.createElement(ArrowRightIcon, null)), /*#__PURE__*/React.createElement(Button, {
        onClick: function onClick(ev) {
            return imageAlign(ev, 'right');
        },
        title: editor.translate('controls.image.actions.alignRight')
    }, /*#__PURE__*/React.createElement(ImageIcon, null), /*#__PURE__*/React.createElement(ArrowRightIcon, null)), /*#__PURE__*/React.createElement(Button, {
        onClick: function onClick() {
            hideOptions();
            editor.showResizeImageDialog(block.getEntityAt(0));
        },
        title: editor.translate('controls.image.actions.resize')
    }, /*#__PURE__*/React.createElement(PhotoSizeSelectLargeIcon, null)), /*#__PURE__*/React.createElement(Button, {
        onClick: removeImage,
        title: editor.translate('controls.image.actions.remove')
    }, /*#__PURE__*/React.createElement(DeleteIcon, null)))));
};

EditorImage.propTypes = {
    src: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    contentState: PropTypes.object.isRequired,
    block: PropTypes.object.isRequired
};

const imagePlugin = function imagePlugin() {
    return {
        blockRendererFn: function blockRendererFn(block) {
            if (block.getType() === blockStyles.ATOMIC) {
                return {
                    component: EditorMedia,
                    editable: false
                };
            }
        }
    };
};

const fileToBase64 = function fileToBase64(file) {
    return new Promise(function (resolve, reject) {
        const reader = new FileReader();

        reader.onload = function () {
            return resolve(reader.result);
        };

        reader.onerror = function () {
            return reject(reader.error);
        };

        reader.readAsDataURL(file);
    });
};

const toolbarControlTypes = {
    divider: {
        name: 'divider',
        component: DividerControl
    },
    undo: {
        name: 'undo',
        component: UndoControl
    },
    redo: {
        name: 'undo',
        component: RedoControl
    },
    bold: {
        name: 'bold',
        component: BoldControl
    },
    italic: {
        name: 'italic',
        component: ItalicControl
    },
    underline: {
        name: 'underline',
        component: UnderlineControl
    },
    strikethrough: {
        name: 'strikethrough',
        component: StrikethroughControl
    },
    fontColor: {
        name: 'fontColor',
        component: FontColorControl,
        plugin: fontColorPlugin
    },
    fontBackgroundColor: {
        name: 'fontBackgroundColor',
        component: FontBackgroundColorControl,
        plugin: fontBackgroundColorPlugin
    },
    linkAdd: {
        name: 'linkAdd',
        component: LinkAddControl,
        plugin: linkAddPlugin
    },
    linkRemove: {
        name: 'linkRemove',
        component: LinkRemoveControl
    },
    image: {
        name: 'image',
        component: ImageControl,
        plugin: imagePlugin
    },
    blockType: {
        name: 'blockType',
        component: BlockTypeControl
    },
    fontSize: {
        name: 'fontSize',
        component: FontSizeControl,
        plugin: fontSizePlugin
    },
    fontFamily: {
        name: 'fontFamily',
        component: FontFamilyControl,
        plugin: fontFamilyPlugin
    },
    textAlign: {
        name: 'textAlign',
        component: TextAlignControl,
        plugin: textAlignPlugin
    },
    unorderedList: {
        name: 'unorderedList',
        component: UnorderedListControl
    },
    orderedList: {
        name: 'orderedList',
        component: OrderedListControl
    }
};
const defaultToolbarControls = [toolbarControlTypes.undo, toolbarControlTypes.redo, toolbarControlTypes.divider, toolbarControlTypes.bold, toolbarControlTypes.italic, toolbarControlTypes.underline, toolbarControlTypes.strikethrough, toolbarControlTypes.fontColor, toolbarControlTypes.fontBackgroundColor, toolbarControlTypes.divider, toolbarControlTypes.linkAdd, toolbarControlTypes.linkRemove, toolbarControlTypes.image, toolbarControlTypes.divider, toolbarControlTypes.blockType, toolbarControlTypes.fontSize, toolbarControlTypes.fontFamily, toolbarControlTypes.textAlign, toolbarControlTypes.divider, toolbarControlTypes.unorderedList, toolbarControlTypes.orderedList];
var colors = [{
    text: 'black',
    value: 'rgb(0, 0, 0)'
}, {
    text: 'dark grey 4',
    value: 'rgb(67, 67, 67)'
}, {
    text: 'dark grey 3',
    value: 'rgb(102, 102, 102)'
}, {
    text: 'dark grey 2',
    value: 'rgb(153, 153, 153)'
}, {
    text: 'dark grey 1',
    value: 'rgb(183, 183, 183)'
}, {
    text: 'grey',
    value: 'rgb(204, 204, 204)'
}, {
    text: 'light grey 1',
    value: 'rgb(217, 217, 217)'
}, {
    text: 'light grey 2',
    value: 'rgb(239, 239, 239)'
}, {
    text: 'light grey 3',
    value: 'rgb(243, 243, 243)'
}, {
    text: 'white',
    value: 'rgb(255, 255, 255)'
}, {
    text: 'Red berry',
    value: 'rgb(152, 0, 0)'
}, {
    text: 'red',
    value: 'rgb(255, 0, 0)'
}, {
    text: 'orange',
    value: 'rgb(255, 153, 0)'
}, {
    text: 'yellow',
    value: 'rgb(255, 255, 0)'
}, {
    text: 'green',
    value: 'rgb(0, 255, 0)'
}, {
    text: 'cyan',
    value: 'rgb(0, 255, 255)'
}, {
    text: 'cornflower blue',
    value: 'rgb(74, 134, 232)'
}, {
    text: 'blue',
    value: 'rgb(0, 0, 255)'
}, {
    text: 'purple',
    value: 'rgb(153, 0, 255)'
}, {
    text: 'magenta',
    value: 'rgb(255, 0, 255)'
}, {
    text: 'light red berry 3',
    value: 'rgb(230, 184, 175)'
}, {
    text: 'light red 3',
    value: 'rgb(244, 204, 204)'
}, {
    text: 'light orange 3',
    value: 'rgb(252, 229, 205)'
}, {
    text: 'light yellow 3',
    value: 'rgb(255, 242, 204)'
}, {
    text: 'light green 3',
    value: 'rgb(217, 234, 211)'
}, {
    text: 'light cyan 3',
    value: 'rgb(208, 224, 227)'
}, {
    text: 'light cornflower blue 3',
    value: 'rgb(201, 218, 248)'
}, {
    text: 'light blue 3',
    value: 'rgb(207, 226, 243)'
}, {
    text: 'light purple 3',
    value: 'rgb(217, 210, 233)'
}, {
    text: 'light magenta 3',
    value: 'rgb(234, 209, 220)'
}, {
    text: 'light red berry 2',
    value: 'rgb(221, 126, 107)'
}, {
    text: 'light red 2',
    value: 'rgb(234, 153, 153)'
}, {
    text: 'light orange 2',
    value: 'rgb(249, 203, 156)'
}, {
    text: 'light yellow 2',
    value: 'rgb(255, 229, 153)'
}, {
    text: 'light green 2',
    value: 'rgb(182, 215, 168)'
}, {
    text: 'light cyan 2',
    value: 'rgb(162, 196, 201)'
}, {
    text: 'light cornflower blue 2',
    value: 'rgb(164, 194, 244)'
}, {
    text: 'light blue 2',
    value: 'rgb(159, 197, 232)'
}, {
    text: 'light purple 2',
    value: 'rgb(180, 167, 214)'
}, {
    text: 'light magenta 2',
    value: 'rgb(213, 166, 189)'
}, {
    text: 'light red berry 1',
    value: 'rgb(204, 65, 37)'
}, {
    text: 'light red 1',
    value: 'rgb(224, 102, 102)'
}, {
    text: 'light orange 1',
    value: 'rgb(246, 178, 107)'
}, {
    text: 'light yellow 1',
    value: 'rgb(255, 217, 102)'
}, {
    text: 'light green 1',
    value: 'rgb(147, 196, 125)'
}, {
    text: 'light cyan 1',
    value: 'rgb(118, 165, 175)'
}, {
    text: 'light cornflower blue 1',
    value: 'rgb(109, 158, 235)'
}, {
    text: 'light blue 1',
    value: 'rgb(111, 168, 220)'
}, {
    text: 'light purple 1',
    value: 'rgb(142, 124, 195)'
}, {
    text: 'light magenta 1',
    value: 'rgb(194, 123, 160)'
}, {
    text: 'dark red berry 1',
    value: 'rgb(166, 28, 0)'
}, {
    text: 'dark red 1',
    value: 'rgb(204, 0, 0)'
}, {
    text: 'dark orange 1',
    value: 'rgb(230, 145, 56)'
}, {
    text: 'dark yellow 1',
    value: 'rgb(241, 194, 50)'
}, {
    text: 'dark green 1',
    value: 'rgb(106, 168, 79)'
}, {
    text: 'dark cyan 1',
    value: 'rgb(69, 129, 142)'
}, {
    text: 'dark cornflower blue 1',
    value: 'rgb(60, 120, 216)'
}, {
    text: 'dark blue 1',
    value: 'rgb(61, 133, 198)'
}, {
    text: 'dark purple 1',
    value: 'rgb(103, 78, 167)'
}, {
    text: 'dark magenta 1',
    value: 'rgb(166, 77, 121)'
}, {
    text: 'dark red berry 2',
    value: 'rgb(133, 32, 12)'
}, {
    text: 'dark red 2',
    value: 'rgb(153, 0, 0)'
}, {
    text: 'dark orange 2',
    value: 'rgb(180, 95, 6)'
}, {
    text: 'dark yellow 2',
    value: 'rgb(191, 144, 0)'
}, {
    text: 'dark green 2',
    value: 'rgb(56, 118, 29)'
}, {
    text: 'dark cyan 2',
    value: 'rgb(19, 79, 92)'
}, {
    text: 'dark cornflower blue 2',
    value: 'rgb(17, 85, 204)'
}, {
    text: 'dark blue 2',
    value: 'rgb(11, 83, 148)'
}, {
    text: 'dark purple 2',
    value: 'rgb(53, 28, 117)'
}, {
    text: 'dark magenta 2',
    value: 'rgb(116, 27, 71)'
}, {
    text: 'dark red berry 3',
    value: 'rgb(91, 15, 0)'
}, {
    text: 'dark red 3',
    value: 'rgb(102, 0, 0)'
}, {
    text: 'dark orange 3',
    value: 'rgb(120, 63, 4)'
}, {
    text: 'dark yellow 3',
    value: 'rgb(127, 96, 0)'
}, {
    text: 'dark green 3',
    value: 'rgb(39, 78, 19)'
}, {
    text: 'dark cyan 3',
    value: 'rgb(12, 52, 61)'
}, {
    text: 'dark cornflower blue 3',
    value: 'rgb(28, 69, 135)'
}, {
    text: 'dark blue 3',
    value: 'rgb(7, 55, 99)'
}, {
    text: 'dark purple 3',
    value: 'rgb(32, 18, 77)'
}, {
    text: 'dark magenta 3',
    value: 'rgb(76, 17, 48)'
}];
const defaultToolbarControlsConfiguration = {
    blockType: {
        options: [{
            value: 'default',
            text: LANG_PREFIX + 'controls.blockType.labels.normal'
        }, {
            value: 'header-one',
            text: LANG_PREFIX + 'controls.blockType.labels.header1'
        }, {
            value: 'header-two',
            text: LANG_PREFIX + 'controls.blockType.labels.header2'
        }, {
            value: 'header-three',
            text: LANG_PREFIX + 'controls.blockType.labels.header3'
        }, {
            value: 'header-four',
            text: LANG_PREFIX + 'controls.blockType.labels.header4'
        }, {
            value: 'header-five',
            text: LANG_PREFIX + 'controls.blockType.labels.header5'
        }, {
            value: 'header-six',
            text: LANG_PREFIX + 'controls.blockType.labels.header6'
        }]
    },
    image: {
        uploadCallback: fileToBase64
    },
    fontColor: {
        colorsPerRow: 10,
        options: colors
    },
    fontBackgroundColor: {
        colorsPerRow: 10,
        options: colors
    },
    fontSize: {
        options: ['default', '8px', '9px', '10px', '11px', '12px', '14px', '18px', '24px', '30px', '36px', '48px', '60px', '72px', '96px']
    },
    fontFamily: {
        options: ['default', 'Arial', 'Verdana', 'Times New Roman', 'Georgia', 'Courier new', 'Lucida Console']
    }
};

const defaultConfig = {
    lang: 'en',
    translations: {},
    draftEditor: {},
    editor: {
        wrapperElement: Paper,
        className: '',
        style: {}
    },
    toolbar: {
        className: '',
        style: {},
        visible: true,
        position: 'top',
        controls: defaultToolbarControls,
        controlsConfig: defaultToolbarControlsConfiguration
    }
};

function isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
}

function mergeDeep(target) {
    for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        sources[_key - 1] = arguments[_key];
    }

    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (let key in source) {
            if (isObject(source[key])) {
                if (!target[key]) {
                    let _Object$assign;

                    Object.assign(target, (_Object$assign = {}, _Object$assign[key] = {}, _Object$assign));
                }

                mergeDeep(target[key], source[key]);
            } else {
                let _Object$assign2;

                Object.assign(target, (_Object$assign2 = {}, _Object$assign2[key] = source[key], _Object$assign2));
            }
        }
    }

    return mergeDeep.apply(void 0, [target].concat(sources));
}

const ca = {
    controls: {
        undo: {
            title: 'Desfer'
        },
        redo: {
            title: 'Refer'
        },
        bold: {
            title: 'Negreta'
        },
        italic: {
            title: 'Cursiva'
        },
        underline: {
            title: 'Subratllat'
        },
        strikethrough: {
            title: 'Ratllat'
        },
        code: {
            title: 'Codi'
        },
        fontColor: {
            title: 'Color de font',
            labels: {
                noColor: 'Sense color'
            }
        },
        fontBackgroundColor: {
            title: 'Color de resaltat del text',
            labels: {
                noColor: 'Sense color'
            }
        },
        linkAdd: {
            title: 'Afegir enllaç',
            labels: {
                link: 'Enllaç'
            },
            actions: {
                add: 'Afegir',
                cancel: 'Cancel·lar'
            }
        },
        linkRemove: {
            title: 'Eliminar enllaç'
        },
        image: {
            title: 'Afegir imatge',
            actions: {
                upload: 'Pujar imatge',
                url: 'Des de URL',
                add: 'Afegir',
                cancel: 'Cancel·lar',
                alignLeft: "Alinear a l'esquerra",
                alignCenter: 'Centrar',
                alignRight: 'Alinear a la dreta',
                remove: 'Eliminar imatge',
                resize: 'Redimensionar'
            },
            labels: {
                dropImageHere: 'Arrossega una imatge aquí o fes click per a pujar una',
                width: 'Ample',
                height: 'Alt',
                url: 'URL',
                insertOptions: 'Opcions de afegir imatge',
                editOptions: "Opcions d'imatge"
            },
            errorMessages: {
                notValidImage: 'La imatge no és vàlida'
            }
        },
        blockType: {
            title: 'Format de bloc',
            labels: {
                normal: 'Normal',
                header1: 'Títol 1',
                header2: 'Títol 2',
                header3: 'Títol 3',
                header4: 'Títol 4',
                header5: 'Títol 5',
                header6: 'Títol 6'
            }
        },
        fontSize: {
            title: 'Grandària de font',
            labels: {
                "default": 'Per defecte'
            }
        },
        fontFamily: {
            title: 'Font',
            labels: {
                "default": 'Per defecte'
            }
        },
        textAlign: {
            title: 'Alinear text',
            actions: {
                alignLeft: 'Esquerra',
                alignCenter: 'Centre',
                alignRight: 'Dreta',
                justify: 'Justificar'
            }
        },
        unorderedList: {
            title: 'Vinyetes'
        },
        orderedList: {
            title: 'Numeració'
        }
    }
};

const en = {
    controls: {
        undo: {
            title: 'Undo'
        },
        redo: {
            title: 'Redo'
        },
        bold: {
            title: 'Bold'
        },
        italic: {
            title: 'Italic'
        },
        underline: {
            title: 'Underline'
        },
        strikethrough: {
            title: 'Strike through'
        },
        code: {
            title: 'Code'
        },
        fontColor: {
            title: 'Font color',
            labels: {
                noColor: 'None'
            }
        },
        fontBackgroundColor: {
            title: 'Highlight color',
            labels: {
                noColor: 'None'
            }
        },
        linkAdd: {
            title: 'Add link',
            labels: {
                link: 'Link'
            },
            actions: {
                add: 'Add',
                cancel: 'Cancel'
            }
        },
        linkRemove: {
            title: 'Remove link'
        },
        image: {
            title: 'Insert image',
            actions: {
                upload: 'Upload image',
                url: 'By URL',
                add: 'Add',
                cancel: 'Cancel',
                alignLeft: 'Align left',
                alignCenter: 'Align center',
                alignRight: 'Align right',
                remove: 'Remove image',
                resize: 'Resize'
            },
            labels: {
                dropImageHere: 'Paste/Drop image here or click to upload',
                width: 'Width',
                height: 'Height',
                url: 'URL',
                insertOptions: 'Insert image options',
                editOptions: 'Image options'
            },
            errorMessages: {
                notValidImage: 'Not a valid image'
            }
        },
        blockType: {
            title: 'Block format',
            labels: {
                normal: 'Normal',
                header1: 'Header 1',
                header2: 'Header 2',
                header3: 'Header 3',
                header4: 'Header 4',
                header5: 'Header 5',
                header6: 'Header 6'
            }
        },
        fontSize: {
            title: 'Font size',
            labels: {
                "default": 'default'
            }
        },
        fontFamily: {
            title: 'Font type',
            labels: {
                "default": 'default'
            }
        },
        textAlign: {
            title: 'Align text',
            actions: {
                alignLeft: 'Left',
                alignCenter: 'Center',
                alignRight: 'Right',
                justify: 'Justify'
            }
        },
        unorderedList: {
            title: 'Unordered list'
        },
        orderedList: {
            title: 'Ordered list'
        }
    }
};

const es = {
    controls: {
        undo: {
            title: 'Deshacer'
        },
        redo: {
            title: 'Rehacer'
        },
        bold: {
            title: 'Negrita'
        },
        italic: {
            title: 'Cursiva'
        },
        underline: {
            title: 'Subrayado'
        },
        strikethrough: {
            title: 'Tachado'
        },
        code: {
            title: 'Código'
        },
        fontColor: {
            title: 'Color de fuente',
            labels: {
                noColor: 'Sin color'
            }
        },
        fontBackgroundColor: {
            title: 'Color de resaltado de texto',
            labels: {
                noColor: 'Sin color'
            }
        },
        linkAdd: {
            title: 'Añadir enlace',
            labels: {
                link: 'Enlace'
            },
            actions: {
                add: 'Añadir',
                cancel: 'Cancelar'
            }
        },
        linkRemove: {
            title: 'Eliminar enlace'
        },
        image: {
            title: 'Insertar imagen',
            actions: {
                upload: 'Subir imagen',
                url: 'Desde URL',
                add: 'Añadir',
                cancel: 'Cancelar',
                alignLeft: 'Alinear a la izquierda',
                alignCenter: 'Centrar',
                alignRight: 'Alinear a la derecha',
                remove: 'Eliminar imagen',
                resize: 'Redimensionar'
            },
            labels: {
                dropImageHere: 'Arrastra una imagen aquí o haz click para subir una',
                width: 'Ancho',
                height: 'Alto',
                url: 'URL',
                insertOptions: 'Opciones de insertar imagen',
                editOptions: 'Opciones de imagen'
            },
            errorMessages: {
                notValidImage: 'La imagen no es válida'
            }
        },
        blockType: {
            title: 'Formato de bloque',
            labels: {
                normal: 'Normal',
                header1: 'Encabezado 1',
                header2: 'Encabezado 2',
                header3: 'Encabezado 3',
                header4: 'Encabezado 4',
                header5: 'Encabezado 5',
                header6: 'Encabezado 6'
            }
        },
        fontSize: {
            title: 'Tamaño de fuente',
            labels: {
                "default": 'Por defecto'
            }
        },
        fontFamily: {
            title: 'Fuente',
            labels: {
                "default": 'Por defecto'
            }
        },
        textAlign: {
            title: 'Alinear texto',
            actions: {
                alignLeft: 'Izquierda',
                alignCenter: 'Centro',
                alignRight: 'Derecha',
                justify: 'Justificar'
            }
        },
        unorderedList: {
            title: 'Viñetas'
        },
        orderedList: {
            title: 'Numeración'
        }
    }
};

const languages = {
    ca: ca,
    en: en,
    es: es
};

const EditorFactories = /*#__PURE__*/function () {
    function EditorFactories(config) {
        this.config = config || defaultConfig;
    }

    const _proto = EditorFactories.prototype;

    _proto.getCompositeDecorator = function getCompositeDecorator() {
        let decorators = [];

        const _iterator = _createForOfIteratorHelperLoose(this.getToolbarControls());
        let _step;
        for (; !(_step = _iterator()).done;) {
            const control = _step.value;
            const pluginData = this.getPluginData(control);

            if (pluginData && pluginData.decorators) {
                decorators = decorators.concat(pluginData.decorators);
            }
        }

        return decorators.length > 0 ? new CompositeDecorator(decorators) : null;
    };

    _proto.getCustomStyleMap = function getCustomStyleMap() {
        let customStyleMap = {};

        const _iterator2 = _createForOfIteratorHelperLoose(this.getToolbarControls());
        let _step2;
        for (; !(_step2 = _iterator2()).done;) {
            const control = _step2.value;
            const pluginData = this.getPluginData(control);

            if (pluginData && pluginData.customStyleMap) {
                customStyleMap = _extends({}, customStyleMap, pluginData.customStyleMap);
            }
        }

        return customStyleMap;
    };

    _proto.getBlockRenderMap = function getBlockRenderMap() {
        let renderMap = DefaultDraftBlockRenderMap;

        const _iterator3 = _createForOfIteratorHelperLoose(this.getToolbarControls());
        let _step3;
        for (; !(_step3 = _iterator3()).done;) {
            const control = _step3.value;
            const pluginData = this.getPluginData(control);

            if (pluginData && pluginData.blockRenderMap) {
                renderMap = renderMap.merge(pluginData.blockRenderMap);
            }
        }

        return renderMap;
    };

    _proto.getBlockStyleFn = function getBlockStyleFn() {
        const _this = this;

        return function (contentBlock) {
            let classNames = '';

            const _iterator4 = _createForOfIteratorHelperLoose(_this.getToolbarControls());
            let _step4;
            for (; !(_step4 = _iterator4()).done;) {
                const control = _step4.value;

                const pluginData = _this.getPluginData(control);

                if (pluginData && pluginData.blockStyleFn) {
                    const result = pluginData.blockStyleFn(contentBlock);
                    if (result) classNames += ' ' + result;
                }
            }

            return classNames.trim();
        };
    };

    _proto.getBlockRendererFn = function getBlockRendererFn() {
        const _this2 = this;

        return function (contentBlock) {
            const _iterator5 = _createForOfIteratorHelperLoose(_this2.getToolbarControls());
            let _step5;
            for (; !(_step5 = _iterator5()).done;) {
                const control = _step5.value;

                const pluginData = _this2.getPluginData(control);

                if (!pluginData || !pluginData.blockRendererFn) continue;
                const result = pluginData.blockRendererFn(contentBlock);
                if (result) return result;
            }
        };
    };

    _proto.getToolbarControls = function getToolbarControls() {
        return this.getConfigItem('toolbar', 'controls');
    };

    _proto.getToolbarControlComponents = function getToolbarControlComponents() {
        const _this3 = this;

        const keyCounter = {};
        return this.getToolbarControls().map(function (control) {
            if (!keyCounter[control.name]) keyCounter[control.name] = 0;
            keyCounter[control.name]++;
            return React.createElement(control.component, {
                key: "" + control.name + keyCounter[control.name],
                configuration: _this3.getToolbarControlConfiguration(control.name),
                defaultConfiguration: defaultToolbarControlsConfiguration[control.name],
                pluginData: _this3.getPluginData(control)
            });
        });
    };

    _proto.getToolbarControlConfiguration = function getToolbarControlConfiguration(controlName) {
        if (this.config && this.config.toolbar && this.config.toolbar.controlsConfig && this.config.toolbar.controlsConfig[controlName]) return this.config.toolbar.controlsConfig[controlName]; else if (defaultToolbarControlsConfiguration[controlName]) return defaultToolbarControlsConfiguration[controlName];
        return null;
    };

    _proto.getPluginData = function getPluginData(control) {
        if (!control.plugin) return null;
        return control.plugin(this.getToolbarControlConfiguration(control.name), defaultToolbarControlsConfiguration[control.name]);
    };

    _proto.getTranslations = function getTranslations() {
        const lang = this.getConfigItem('lang');
        const langTranslations = languages[lang];
        const customTranslations = this.config.translations || {};
        return mergeDeep(langTranslations, customTranslations);
    };

    _proto.getToolbarPosition = function getToolbarPosition() {
        return this.getConfigItem('toolbar', 'position').toLowerCase();
    };

    _proto.getConfigItem = function getConfigItem() {
        let item = _extends({}, this.config);

        const _len = arguments.length, keys = new Array(_len);
        let _key = 0;
        for (; _key < _len; _key++) {
            keys[_key] = arguments[_key];
        }

        let _i = 0;
        const _keys = keys;
        for (; _i < _keys.length; _i++) {
            const key = _keys[_i];
            item = item[key];
            if (item === undefined) break;
        }

        if (item !== undefined) return item;
        item = _extends({}, defaultConfig);

        let _i2 = 0;
        const _keys2 = keys;
        for (; _i2 < _keys2.length; _i2++) {
            const _key2 = _keys2[_i2];
            item = item[_key2];
        }

        return item;
    };

    return EditorFactories;
}();

function EditorToolbar(_ref) {
    const children = _ref.children,
        _ref$visible = _ref.visible,
        visible = _ref$visible === void 0 ? true : _ref$visible,
        rest = _objectWithoutPropertiesLoose(_ref, ["children", "visible"]);

    return /*#__PURE__*/React.createElement(Paper, _extends({
        hidden: !visible
    }, rest), /*#__PURE__*/React.createElement(Grid, {
        container: true,
        alignItems: "center"
    }, children));
}

EditorToolbar.propTypes = {
    children: PropTypes.any,
    visible: PropTypes.bool
};

const Translator = /*#__PURE__*/function () {
    function Translator(translations) {
        this.translations = translations;
    }

    const _proto = Translator.prototype;

    _proto.get = function get(id) {
        if (!id) return '';
        const keys = id.split('.');
        let item = this.translations;

        const _iterator = _createForOfIteratorHelperLoose(keys);
        let _step;
        for (; !(_step = _iterator()).done;) {
            const key = _step.value;
            item = item[key];
            if (item === undefined) return '';
        }

        return item || '';
    };

    return Translator;
}();

let _blockHTMLMap;
const blockHTMLMap = (_blockHTMLMap = {}, _blockHTMLMap[blockStyles.H1] = 'h1', _blockHTMLMap[blockStyles.H2] = 'h2', _blockHTMLMap[blockStyles.H3] = 'h3', _blockHTMLMap[blockStyles.H4] = 'h4', _blockHTMLMap[blockStyles.H5] = 'h5', _blockHTMLMap[blockStyles.H6] = 'h6', _blockHTMLMap[blockStyles.BLOCKQUOTE] = 'blockquote', _blockHTMLMap[blockStyles.CODE_BLOCK] = 'code', _blockHTMLMap[blockStyles.UNSTYLED] = 'p', _blockHTMLMap[blockStyles.ATOMIC] = 'figure', _blockHTMLMap[blockStyles.UL] = 'li', _blockHTMLMap[blockStyles.OL] = 'li', _blockHTMLMap);

let _entityHTMLMap;
const entityHTMLMap = (_entityHTMLMap = {}, _entityHTMLMap[entities.LINK] = function (entity) {
    return ["<a href=\"" + entity.getData().url + "\" target=\"_blank\">", '</a>'];
}, _entityHTMLMap[entities.IMAGE] = function (entity) {
    return ["<img src=\"" + entity.data.src + "\" alt=\"\" width=\"" + entity.getData().width + "\" height=\"" + entity.getData().height + "\">", ''];
}, _entityHTMLMap);

const isInlineStyleCollection = function isInlineStyleCollection(inlineStyle, style) {
    return inlineStyle.substr(0, style.length) === style;
};

const getInlineStyleCollectionValue = function getInlineStyleCollectionValue(inlineStyle, style) {
    return inlineStyle.substr(style.length + 1);
};

const getInlineStylesCss = function getInlineStylesCss(inlineStyle) {
    switch (inlineStyle) {
        case inlineStyles.BOLD:
            return 'font-weight: bold;';

        case inlineStyles.ITALIC:
            return 'font-style: italic;';

        case inlineStyles.UNDERLINE:
            return 'text-decoration: underline;';

        case inlineStyles.STRIKETHROUGH:
            return 'text-decoration: line-through;';

        case inlineStyles.CODE:
            return 'font-family: monospace;';

        default:
            if (isInlineStyleCollection(inlineStyle, inlineStyles.FONT_FAMILY)) {
                return "font-family: '" + getInlineStyleCollectionValue(inlineStyle, inlineStyles.FONT_FAMILY) + "';";
            }

            if (isInlineStyleCollection(inlineStyle, inlineStyles.FONT_SIZE)) {
                return "font-size: " + getInlineStyleCollectionValue(inlineStyle, inlineStyles.FONT_SIZE) + ";";
            }

            if (isInlineStyleCollection(inlineStyle, inlineStyles.FONT_COLOR)) {
                return "color: " + getInlineStyleCollectionValue(inlineStyle, inlineStyles.FONT_COLOR) + ";";
            }

            if (isInlineStyleCollection(inlineStyle, inlineStyles.FONT_BACKGROUND)) {
                return "background-color: " + getInlineStyleCollectionValue(inlineStyle, inlineStyles.FONT_BACKGROUND) + ";";
            }

            return '';
    }
};

const toHTML = function toHTML(contentState) {
    let html = '';
    let isListBlock = false;
    const blockMap = contentState.getBlockMap();
    let blockCount = 0;

    const _iterator = _createForOfIteratorHelperLoose(blockMap);
    let _step;
    for (; !(_step = _iterator()).done;) {
        const blockData = _step.value;
        const block = blockData[1];
        const blockTag = blockHTMLMap[block.getType()];
        const blockStyle = block.getData().has('textAlign') ? "text-align:" + block.getData().get('textAlign') + ";" : null;
        let blockOpenTag = blockTag ? "<" + blockTag + (blockStyle ? " style=\"" + blockStyle + "\"" : '') + ">" : '';
        let blockCloseTag = blockTag ? "</" + blockTag + ">" : '';

        if (block.getType() === blockStyles.UL || block.getType() === blockStyles.OL) {
            if (!isListBlock) {
                blockOpenTag = "" + (block.getType() === blockStyles.UL ? '<ul>' : '<ol>') + blockOpenTag;
            }

            if (blockCount === blockMap.length - 1) {
                blockCloseTag = "" + blockCloseTag + (block.getType() === blockStyles.UL ? '</ul>' : '</ol>');
            }

            isListBlock = true;
        } else {
            if (isListBlock) {
                blockOpenTag = "" + (block.getType() === blockStyles.UL ? '</ul>' : '</ol>') + blockOpenTag;
            }

            isListBlock = false;
        }

        if (block.getLength() === 0) {
            html += blockOpenTag + blockCloseTag;
            continue;
        }

        html += blockOpenTag;
        let lastEntityKey = null;
        const currentOpenedStylesMap = {};

        for (let charIndex in block.getText()) {
            const isLastChar = parseInt(charIndex) === block.getLength() - 1;
            let entityOpenTag = '';
            let entityCloseTag = '';
            const currentEntityKey = block.getEntityAt(charIndex);

            if (currentEntityKey !== lastEntityKey) {
                if (lastEntityKey === null) {
                    const entity = contentState.getEntity(currentEntityKey);
                    entityOpenTag = entityHTMLMap[entity.getType()](entity)[0];
                } else if (currentEntityKey === null) {
                    const _entity = contentState.getEntity(lastEntityKey);

                    entityCloseTag = entityHTMLMap[_entity.getType()](_entity)[1];
                } else {
                    const entityHaveToClose = contentState.getEntity(lastEntityKey);
                    const entityHaveToOpen = contentState.getEntity(currentEntityKey);
                    entityOpenTag = entityHTMLMap[entityHaveToClose.getType()](entityHaveToClose)[0] + entityHTMLMap[entityHaveToOpen.getType()](entityHaveToOpen)[1];
                }
            } else if (currentEntityKey !== null && isLastChar) {
                const _entity2 = contentState.getEntity(currentEntityKey);

                entityCloseTag = entityHTMLMap[_entity2.getType()](_entity2)[1];
            }

            const charInlineStyles = block.getInlineStyleAt(charIndex);
            const styleCloseTagBeforeList = [];
            const styleOpenTagList = [];
            const styleCloseTagList = [];
            const styleCloseTagOpenIndexList = [];
            const styleCloseTagBeforeOpenIndexList = [];

            const _iterator2 = _createForOfIteratorHelperLoose(charInlineStyles);
            let _step2;
            for (; !(_step2 = _iterator2()).done;) {
                const _inlineStyle3 = _step2.value;

                if (currentOpenedStylesMap[_inlineStyle3] === undefined) {
                    styleOpenTagList.push(_inlineStyle3);
                    currentOpenedStylesMap[_inlineStyle3] = charIndex;
                } else if (entityOpenTag || entityCloseTag) {
                    styleCloseTagBeforeList.push(_inlineStyle3);
                    styleCloseTagBeforeOpenIndexList.push(currentOpenedStylesMap[_inlineStyle3]);
                    delete currentOpenedStylesMap[_inlineStyle3];
                } else if (isLastChar) {
                    styleCloseTagList.push(_inlineStyle3);
                    styleCloseTagOpenIndexList.push(currentOpenedStylesMap[_inlineStyle3]);
                    delete currentOpenedStylesMap[_inlineStyle3];
                }
            }

            for (let inlineStyle in currentOpenedStylesMap) {
                if (!charInlineStyles.includes(inlineStyle) && !styleCloseTagList.includes(inlineStyle) && !styleCloseTagBeforeList.includes(inlineStyle)) {
                    styleCloseTagBeforeList.push(inlineStyle);
                    styleCloseTagBeforeOpenIndexList.push(currentOpenedStylesMap[inlineStyle]);
                    delete currentOpenedStylesMap[inlineStyle];
                } else if (isLastChar) {
                    styleCloseTagList.push(inlineStyle);
                    styleCloseTagOpenIndexList.push(currentOpenedStylesMap[inlineStyle]);
                    delete currentOpenedStylesMap[inlineStyle];
                }
            }

            let _i = 0;
            const _styleCloseTagOpenInd = styleCloseTagOpenIndexList;
            for (; _i < _styleCloseTagOpenInd.length; _i++) {
                const closedIndex = _styleCloseTagOpenInd[_i];

                for (let _inlineStyle in currentOpenedStylesMap) {
                    if (currentOpenedStylesMap[_inlineStyle] > closedIndex) {
                        styleCloseTagList.push(_inlineStyle);
                        styleCloseTagOpenIndexList.push(currentOpenedStylesMap[_inlineStyle]);
                        delete currentOpenedStylesMap[_inlineStyle];
                    }
                }
            }

            let _i2 = 0;
            const _styleCloseTagBeforeO = styleCloseTagBeforeOpenIndexList;
            for (; _i2 < _styleCloseTagBeforeO.length; _i2++) {
                const _closedIndex = _styleCloseTagBeforeO[_i2];

                for (let _inlineStyle2 in currentOpenedStylesMap) {
                    if (currentOpenedStylesMap[_inlineStyle2] < charIndex && currentOpenedStylesMap[_inlineStyle2] > _closedIndex) {
                        styleCloseTagBeforeList.push(_inlineStyle2);
                        styleCloseTagBeforeOpenIndexList.push(currentOpenedStylesMap[_inlineStyle2]);
                        delete currentOpenedStylesMap[_inlineStyle2];

                        if (charInlineStyles.includes(_inlineStyle2)) {
                            styleOpenTagList.push(_inlineStyle2);
                            currentOpenedStylesMap[_inlineStyle2] = charIndex;
                        }
                    }
                }
            }

            let j = 0;

            while (j < styleCloseTagBeforeList.length) {
                html += '</span>';
                j++;
            }

            html += entityOpenTag;

            let _i3 = 0;
            const _styleOpenTagList = styleOpenTagList;
            for (; _i3 < _styleOpenTagList.length; _i3++) {
                const style = _styleOpenTagList[_i3];
                html += '<span style="' + getInlineStylesCss(style) + '">';
            }

            html += block.getText()[charIndex];
            let k = 0;

            while (k < styleCloseTagList.length) {
                html += '</span>';
                k++;
            }

            html += entityCloseTag;
            lastEntityKey = currentEntityKey;
        }

        html += blockCloseTag;
        blockCount++;
    }

    return html;
};

var EditorContext = React.createContext({});
const MUIEditorState = {
    createEmpty: function createEmpty(config) {
        const editorFactories = new EditorFactories(config);
        return EditorState.createEmpty(editorFactories.getCompositeDecorator());
    },
    createWithContent: function createWithContent(config, contentState) {
        const editorFactories = new EditorFactories(config);
        return EditorState.createWithContent(contentState, editorFactories.getCompositeDecorator());
    }
};
const useStyles$6 = makeStyles(function (theme) {

    return {
        '@global': {
            '.mui-editor-left-aligned-block': {
                textAlign: 'left !important',
                '& > div': {
                    textAlign: 'left !important'
                }
            },
            '.mui-editor-center-aligned-block': {
                textAlign: 'center !important',
                '& > div': {
                    textAlign: 'center !important'
                }
            },
            '.mui-editor-right-aligned-block': {
                textAlign: 'right !important',
                '& > div': {
                    textAlign: 'right !important'
                }
            },
            '.mui-editor-justify-aligned-block': {
                textAlign: 'justify !important',
                '& > div': {
                    textAlign: 'justify !important'
                }
            }
        },
        editorWrapper: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
            padding: theme.spacing(5)
        }
    };
});

function MUIEditor(_ref) {
    const editorState = _ref.editorState,
        onChange = _ref.onChange,
        _ref$onFocus = _ref.onFocus,
        onFocus = _ref$onFocus === void 0 ? null : _ref$onFocus,
        _ref$onBlur = _ref.onBlur,
        onBlur = _ref$onBlur === void 0 ? null : _ref$onBlur,
        _ref$config = _ref.config,
        config = _ref$config === void 0 ? defaultConfig : _ref$config;
    const editorFactories = new EditorFactories(config);
    const editorRef = React.useRef(null);
    const translateRef = React.useRef(function () {
    });
    const translationsRef = React.useRef(null);
    const toolbarVisibleConfig = editorFactories.getConfigItem('toolbar', 'visible');

    const _React$useState = React.useState(toolbarVisibleConfig),
        isToolbarVisible = _React$useState[0],
        setIsToolbarVisible = _React$useState[1];

    const _React$useState2 = React.useState(false),
        isResizeImageDialogVisible = _React$useState2[0],
        setIsResizeImageDialogVisible = _React$useState2[1];

    const _React$useState3 = React.useState(null),
        resizeImageEntityKey = _React$useState3[0],
        setResizeImageEntityKey = _React$useState3[1];

    translationsRef.current = editorFactories.getTranslations();
    translateRef.current = React.useCallback(function (id) {
        const translator = new Translator(translationsRef.current);
        return translator.get(id);
    }, []);
    const classes = useStyles$6();
    React.useEffect(function () {
        setIsToolbarVisible(toolbarVisibleConfig);
    }, [toolbarVisibleConfig]);
    const toolbar = /*#__PURE__*/React.createElement(EditorToolbar, {
        visible: isToolbarVisible,
        style: editorFactories.getConfigItem('toolbar', 'style'),
        className: editorFactories.getConfigItem('toolbar', 'className')
    }, editorFactories.getToolbarControlComponents());
    const top = editorFactories.getToolbarPosition() === 'top' ? toolbar : null;
    const bottom = editorFactories.getToolbarPosition() === 'bottom' ? toolbar : null;

    const handleKeyCommand = function handleKeyCommand(command) {
        const newState = RichUtils.handleKeyCommand(editorState, command);

        if (newState) {
            onChange(newState);
            return 'handled';
        }

        return 'not-handled';
    };

    const handleFocus = function handleFocus(ev) {
        if (onFocus) onFocus(ev);
    };

    const handleBlur = function handleBlur(ev) {
        if (onBlur) onBlur(ev);
    };

    const editorWrapperProps = {
        style: editorFactories.getConfigItem('editor', 'style'),
        className: classes.editorWrapper + " " + editorFactories.getConfigItem('editor', 'className'),
        onClick: function onClick() {
            return editorRef.current.focus();
        }
    };
    const editorWrapperElement = editorFactories.getConfigItem('editor', 'wrapperElement');

    if (editorWrapperElement === Paper) {
        editorWrapperProps.elevation = 3;
    }

    const EditorWrapper = React.createElement(editorWrapperElement, editorWrapperProps, /*#__PURE__*/React.createElement(Editor, _extends({}, editorFactories.getConfigItem('draftEditor'), {
        ref: editorRef,
        editorState: editorState,
        onChange: onChange,
        onFocus: function onFocus(ev) {
            return handleFocus(ev);
        },
        onBlur: function onBlur(ev) {
            return handleBlur(ev);
        },
        // onPaste: () => {
        //     setIsResizeImageDialogVisible(true);
        // },
        handleKeyCommand: handleKeyCommand,
        blockStyleFn: editorFactories.getBlockStyleFn(),
        customStyleMap: editorFactories.getCustomStyleMap(),
        blockRenderMap: editorFactories.getBlockRenderMap(),
        blockRendererFn: editorFactories.getBlockRendererFn()
    })));
    return /*#__PURE__*/React.createElement(EditorContext.Provider, {
        value: {
            editorState: editorState,
            onChange: onChange,
            ref: editorRef.current,
            translate: translateRef.current,
            showResizeImageDialog: function showResizeImageDialog(entityKey) {
                setIsResizeImageDialogVisible(true);
                setResizeImageEntityKey(entityKey);
            },
            hideResizeImageDialog: function hideResizeImageDialog() {
                setIsResizeImageDialogVisible(false);
                setResizeImageEntityKey(null);
            },
            isResizeImageDialogVisible: isResizeImageDialogVisible,
            resizeImageEntityKey: resizeImageEntityKey
        }
    }, top, EditorWrapper, bottom);
}

MUIEditor.displayName = 'MUIEditor';
MUIEditor.propTypes = {
    editorState: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    config: PropTypes.object
};
MUIEditor.defaultProps = {
    config: defaultConfig
};

export default MUIEditor;
export {
    EditorContext,
    LANG_PREFIX,
    MUIEditorState,
    fileToBase64,
    toHTML,
    toolbarControlTypes,
    useEditor,
    useEditorFocus
};

