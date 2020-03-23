import React from 'react';
import Marked from 'marked';

const template = `
> Simple React Markdown Editor

# Header 1

## Header 2

### Header 3

#### Header 4

##### Header 5

Some inline code \` const doSomething = () => {}\`

\`\`\`
class App extends React.Component {
	render() {
		return <MarkdownEditor />;
	}
}
\`\`\`

__Some strong text__

_Some emphasized text_

> A glorious quote

T-Header 1 | T-Header 2 | T-Header 3
-----------| ----------| ----------
something | something | something

- some unordered list
	- somethig else
	- do again

1. do this
2. do that

`;

const ToMarkdown = ({ text }) => {
  const result = Marked(text);
  return <div dangerouslySetInnerHTML={{ __html: result }}></div>;
};

export default ToMarkdown;
