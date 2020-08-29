import * as React from 'react';
import { Button } from '@jianghe/sand-editor-ui';
import inSelectionInImage from '../../image/utils/inSelectionInImage';

export interface FormatPainterButtonProps {
  // 自定义的格式刷配置
  formatPainterConfig: object;
  onClick: (name: string, changer: Function) => void;
  editor?: any;
}

export default class FormatPainterButton extends React.Component<
  FormatPainterButtonProps
> {
  isActive() {
    const { editor } = this.props;
    if (!editor) return true;
    const { value } = editor;
    const formatClipboard = value.data.get('formatClipboard');
    // 有数据切trigger来自toolbar
    return formatClipboard && formatClipboard.trigger === 'toolbar';
  }

  isDisabled() {
    const { editor } = this.props;
    if (!editor) return true;
    const { value } = editor;
    const edgeSelection = value.data.get('edgeSelection');
    const inSelectionImage = inSelectionInImage(value, editor);
    return edgeSelection || inSelectionImage;
  }

  handleClick = () => {
    const { editor } = this.props;
    if (!editor) return true;
    const { value } = editor;
    // 判断data中有没有formatClipboard，
    // 如果有需要获取选区中的格式
    // 如果没有表示需要清除保存的格式
    const formatClipboard = value.data.get('formatClipboard');
    if (!formatClipboard) {
      return editor.copyFormat('toolbar');
    }
    return editor.clearFormatClipboard();
  };

  render() {
    return (
      <Button
        disabled={this.isDisabled()}
        tip="格式刷"
        active={this.isActive()}
        iconType="paintformat"
        onClick={this.handleClick}
      />
    );
  }
}
