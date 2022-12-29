import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

/**
 * Document는 Page를 렌더링하는데 공통적으로 필요한 태그, 메타정보, 폰트 등을 커스텀하는데 사용한다.
 */
export default class MyDocument extends Document {
  // 초기 서버 측에서 페이지를 불러올 때 스타일을 입혀 불러오도록 설정함
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet(); // 서버측에 그려질 sheet를 새로 만듦
    const originalRenderPage = ctx.renderPage; // CSS-in-JS 라이브러리 커스텀 시 사용
    try {
      // 새로 만든 sheet에 styled-components 스타일을 결합
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });
      const initialProps = await Document.getInitialProps(ctx);

      // 기존 html에  style 태그를 추가한다.
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
