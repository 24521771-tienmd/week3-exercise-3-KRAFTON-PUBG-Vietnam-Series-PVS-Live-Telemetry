# UIT S3T - LAB 3 AI GOVERNANCE RULES (.cursorrules / project-rules.md)

> Dán file này vào đầu MỖI phiên làm việc với AI (Claude, ChatGPT, Cursor, Copilot).
> Nếu AI vi phạm bất kỳ luật nào bên dưới: KHÔNG dùng code đó, ghi vào AI_FAILURE_AUDIT.md.

## 0. Cách làm việc với AI

- Chỉ xin MỘT task nhỏ mỗi lần (1 component, 1 handler, 1 state). Không dán nguyên đề bài.
- Tôi (người học) đã viết contract Props/State trước. AI chỉ điền phần cài đặt theo contract.
- Mỗi lần AI trả code: đọc hiểu, chạy thử, kiểm tra DevTools rồi mới commit.
- Giải thích ngắn gọn vì sao chọn cách viết đó (để tôi bảo vệ được trong 3 phút).

## 1. Stack

- React 19 + Vite + ES2024. JavaScript (.jsx), JSDoc để mô tả contract.
- Mount bằng `createRoot` từ `react-dom/client`, bọc `<StrictMode>`.
- Chỉ import hook cần dùng: `import { useState, useEffect, useId } from 'react'`.
- Style: CSS Modules (`*.module.css`) + CSS Custom Properties. Không inline style, không CSS global của thư viện cũ.

## 2. API bị CẤM (legacy)

- `class ... extends React.Component` (mọi class component)
- `ReactDOM.render`, `import * as React`, `import * as ReactDOM`
- `Component.defaultProps` (dùng default parameter ES6 trong chữ ký hàm)
- `keyCode`, `keypress` (dùng `e.code`)
- `window.alert()`, `confirm()`, `prompt()` (dùng `role="alert"` / `role="status"`)
- `dangerouslySetInnerHTML`
- URL `http://` (chỉ HTTPS)
- `key={index}` hoặc `key={giá trị text}` (dùng id ổn định)

## 3. HTML ngữ nghĩa (ZERO DIV-SOUP)

- Dùng: `<main>`, `<section>`, `<article>`, `<header>`, `<hgroup>`, `<dl>`, `<dt>`, `<dd>`, `<ul>`, `<li>`, `<figure>`, `<output>`.
- Chỉ MỘT `<main>` ở cấp cao nhất; `<section>`/`<article>` nằm bên trong.
- Dữ liệu key-value dùng `<dl>/<dt>/<dd>`, KHÔNG dùng nhiều thẻ `<h1>`.
- Nhóm phần tử anh em không cần wrapper: dùng `<>...</>` hoặc `<Fragment key={...}>`.
- Ex 1: tuyệt đối 0 thẻ `<div>` trong `DeveloperCard.jsx`.
- Mỗi `<button>` hành động phải có `type="button"`.
- Ảnh luôn có `alt`, `width`, `height` (tránh CLS) và fallback khi lỗi.

## 4. Form và A11y

- Mọi `<input>`/`<select>` đi kèm `<label htmlFor={id}>` với `id = useId()`.
- Input số: đọc `e.target.valueAsNumber`, xử lý `Number.isNaN`. Không dùng `e.target.value` để so sánh số.
- Thông báo kết quả/trạng thái: `<output role="status" aria-live="polite">`.
- Thông báo lỗi: `<section role="alert">`, có nút thử lại.
- Trạng thái đang tải: `aria-busy="true"`.
- Mục tiêu: không cuộn ngang ở 375px, Lighthouse Accessibility = 100.

## 5. State hygiene

- Chỉ lưu trong `useState` các giá trị gốc, độc lập (ví dụ: `people`, `query`, `minIq`, `sortBy`).
- Dữ liệu suy ra (lọc, sắp xếp, đếm) TÍNH TRỰC TIẾP trong lúc render. Không `useState` + `useEffect` để đồng bộ.
- Cập nhật bất biến: spread `[...prev, x]`, `.filter`, `.map`, `.toSorted()`.
- Cấm `.push`, `.splice`, `.sort()` trực tiếp trên state/props.
- Dùng functional update `setX((prev) => ...)` khi giá trị mới phụ thuộc giá trị cũ.

## 6. Effect cleanup

- Chỉ dùng `useEffect` để đồng bộ với hệ thống bên ngoài (timer, fetch, listener, audio).
- MỌI effect có timer/listener/fetch PHẢI trả về hàm cleanup:
  - `clearTimeout` / `clearInterval`
  - `removeEventListener`
  - `controller.abort()` (AbortController cho fetch)
- Khai báo đủ dependency, không bỏ trống `[]` khi effect đọc state/props.
- Trong `.catch`: `if (err.name === 'AbortError') return;` để không hiện lỗi giả.

## 7. Async state machine

- Trạng thái dùng một object: `{ status: 'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR', data, error }`.
- Cấm "boolean soup" (`isLoading && isError && ...`).
- Skeleton đúng kích thước nội dung thật để CLS = 0.

## 8. Cách AI phải trả lời

- Chỉ trả về code của task được yêu cầu, không viết lại cả file.
- Không thêm thư viện ngoài khi tôi chưa cho phép.
- Nếu yêu cầu mâu thuẫn với luật ở trên: nói rõ, KHÔNG tự ý vi phạm.

## 9. Git

- Commit nhỏ, nguyên tử, message theo dạng `type(scope): mô tả` (feat, style, fix, chore, docs).
- Chỉ commit sau khi đã kiểm tra DevTools cho phần đó.