# Front-end with NextJS

## Directories

```bash
.
├── README.md
├── next-env.d.ts
├── next.config.js
├── package.json
├── pages
│   ├── api
│   │   ├── hello.ts
│   │   └── photos.ts
│   ├── _app.tsx
│   ├── _document.tsx
│   └── index.tsx
├── hooks
├── store
│   ├── index.ts
│   └── user.ts
├── styles
│   ├── Home.module.css
│   └── globals.css
├── public
├── tsconfig.json
└── utils
    └── api.ts

```

- hooks - 용도에 맞는 custom hook 추가
- pages - 페이지 구성을 담당하는 컴포넌트, 폴더 구조로 url 결정
  - \_app.tsx - react/index.js 와 같은 기능을 한다.
  - index.tsx - react/App.js 와 같은 기능을 한다.
  - api/ - `/api*`로 처리되며, 서버 측 번들로 클라이언트 번들에 포함되지 않음, 동적 경로를 지원
- public - 정적 파일을 관리
- styles - 전역 스타일을 관리
- types - 도메인별 type interface 관리
- utils - api.ts 등 기타 유틸성 파일

---

## TODO : 우선순위 순

- [x] Next.js + React + Typescript 기본 환경 세팅
- [x] Style-Components Next 설정
- [x] Redux + Redux-toolkit + Next-Redux 기본 환경 구성
- [ ] 기본 API Fetch 로직 구현 with SWR
- [ ] 상태 관리 로직 구현 with Redux, Redux-toolkit
- [ ] SSR 테스트 페이지 구현
- [ ] CSR 테스트 페이지 구현

---

## Ref

- Next Commerce
  https://github.com/vercel/commerce
  https://github.com/vercel/next.js/tree/canary/examples/with-redux
