import * as React from 'react';
import { Editor, getEventTransfer } from '@jianghe/slate-react';
import cx from 'classnames';
import { window, document } from 'ssr-window';
import { noop, createDebug, createDefaultValue } from '../utils';
import Toolbar from '../components/Toolbar';
import './SandEditor.less';

const debug = createDebug('SandEditor');

const EVENT_PROPS = [
  'onBeforeInput',
  'onBlur',
  'onFocus',
  'onCopy',
  'onCut',
  'onDrop',
  'onKeyDown',
  'onKeyUp',
  'onPaste',
  'onSelect',
];

type SandEditorProps = {
  clsPrefix?: string;
  defaultValue?: any;
  value?: any;
  placeholder?: React.ReactNode;
  toolbar?: any[];
  toolbarClassName?: any[];
  toolbarDisabled?: boolean;
  plugins?: { array: any[]; map: any };
  onChange?: (...args: any[]) => any;
  onComponentDidCatch?: (...args: any[]) => any;
  getScrollableContainer?: (...args: any[]) => any;
  getScrollableContent?: (...args: any[]) => any;
  renderToolbar?: (...args: any[]) => any;
  renderEditor?: (...args: any[]) => any;
  editorRef?: (...args: any[]) => any;
  editorClassName?: string;
  editorStyle?: any;
  autoFocus?: boolean;
  readOnly?: boolean;
  onBeforeInput?: (...args: any[]) => any;
  onBlur?: (...args: any[]) => any;
  onFocus?: (...args: any[]) => any;
  onCopy?: (...args: any[]) => any;
  onCut?: (...args: any[]) => any;
  onDrop?: (...args: any[]) => any;
  onKeyDown?: (...args: any[]) => any;
  onKeyUp?: (...args: any[]) => any;
  onPaste?: (...args: any[]) => any;
  onSelect?: (...args: any[]) => any;
  schema?: any;
};

type SandEditorState = {
  isComposing: boolean;
  value: any;
};

type SandEditorChildContextType = {
  xIsComposing: boolean;
};

class SandEditor extends React.Component<SandEditorProps, SandEditorState> {
  static childContextTypes: SandEditorChildContextType;

  static defaultProps = {
    clsPrefix: 'sand-editor',
    getScrollableContainer: function getScrollableContainer() {
      return window;
    },
    getScrollableContent: function getScrollableContent() {
      return document.body;
    },
    onComponentDidCatch: noop,
    onChange: noop,
    placeholder: '在这里输入',
    plugins: { array: [], map: {} },
    autoFocus: true,
    schema: {},
    renderToolbar: (toolbar) => toolbar,
  };

  // Editor 实例
  editor: any;

  composing = false;

  constructor(props) {
    super(props);
    this.state = {
      isComposing: false,
      value:
        'defaultValue' in props ? props.defaultValue : createDefaultValue(),
    };
  }

  getChildContext() {
    return {
      xIsComposing: this.state.isComposing,
    };
  }

  componentDidCatch(error, info) {
    this.props.onComponentDidCatch(error, info);
  }

  /**
   * 获取Editor实例
   * @param editor
   */
  ref = (editor) => {
    const { editorRef } = this.props;
    this.editor = editor;
    // 如果props中有editorRef属性，调用editorRef将Editor传递给调用者
    typeof editorRef === 'function' && editorRef(editor);
  };

  /**
   * 判断数据是SandEditor控制还是组件外部控制
   */
  isControlled = () => {
    return this.props.value !== undefined;
  };

  /**
   * 获取SVI
   */
  getValue = () => {
    const { value } = this.isControlled() ? this.props : this.state;
    return value;
  };

  onChange = ({ value }) => {
    const { onChange } = this.props;
    // 受控模式，内部不维护状态
    if (this.isControlled()) {
      onChange(value);
      return;
    }
    // 非受控模式改变内部状态
    this.setState(
      () => ({
        value,
      }),
      () => {
        onChange(this.state.value);
      }
    );
  };

  /**
   * Toolbar被点击时回调
   * @param type
   */
  onToolbarClick = (type) => {
    debug('onToolbarClick ->', type);
  };

  render() {
    const {
      placeholder,
      toolbar,
      plugins,
      autoFocus,
      clsPrefix,
      renderToolbar,
      renderEditor,
      editorClassName,
      toolbarClassName,
      toolbarDisabled,
      editorStyle,
      readOnly,
      schema,
    } = this.props;
    const value = this.getValue();
    const toolbarNode = (
      <Toolbar
        disabled={!this.editor || toolbarDisabled}
        plugins={plugins}
        toolbar={toolbar}
        onClick={this.onToolbarClick}
        editor={this.editor}
      />
    );
    const editorProps = {
      style: editorStyle,
      className: cx(editorClassName, `${clsPrefix}-body`),
      autoFocus,
      readOnly,
      placeholder,
      value,
      plugins: plugins.array,
      onChange: this.onChange,
      ref: this.ref,
      schema,
    };

    EVENT_PROPS.forEach((event) => {
      if (this.props[event]) {
        editorProps[event] = this.props[event];
      }
    });

    if (renderEditor) {
      // @ts-ignore
      editorProps.renderEditor = renderEditor;
    }

    return (
      <div className={`${clsPrefix}-container`}>
        <div className={cx(`${clsPrefix}-toolbar`, toolbarClassName)}>
          {renderToolbar(toolbarNode)}
        </div>
        <div className={clsPrefix}>
          <Editor {...editorProps} />
        </div>
      </div>
    );
  }
}

export default SandEditor;

export { getEventTransfer };
