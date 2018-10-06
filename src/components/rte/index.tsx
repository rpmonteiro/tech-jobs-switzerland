import * as preact from 'preact';
import Quill from 'quill';

interface Props {
  setEditorRef: (el: Quill) => void;
}

export class Rte extends preact.Component<Props> {
  rte: Quill | null = null;
  rteContainer: HTMLDivElement | null = null;

  componentDidMount() {
    if (!this.rteContainer) {
      return;
    }

    this.rte = new Quill(this.rteContainer, {
      theme: 'snow',
      placeholder: 'Add a description...',
    });

    this.props.setEditorRef(this.rte);
  }

  shouldComponentUpdate() {
    return false;
  }

  setRteContainerRef = (el: HTMLDivElement) => {
    this.rteContainer = el;
  }

  render () {
    return <div ref={this.setRteContainerRef} />;
  }
}
