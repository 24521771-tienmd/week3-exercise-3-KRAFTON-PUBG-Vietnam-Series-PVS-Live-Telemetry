# TASK_DECOMPOSITION.md - Lab 3 (React 19)

> Cách dùng: làm lần lượt từng task. Xong task nào thì tick `[x]`.
> Mỗi nhóm task kết thúc bằng 1 commit (khớp message đề yêu cầu).
> Với mỗi task: (1) tự viết contract, (2) nhờ AI đúng 1 mảnh nhỏ kèm `project-rules.md`, (3) kiểm chứng, (4) commit.

---

## BLOCK 1: Khởi tạo (phút 0-40)

- [ ] T0.1: `npm create vite@latest` chọn React (JavaScript), kiểm tra `main.jsx` dùng `createRoot` + `StrictMode`
- [ ] T0.2: Dọn file mẫu của Vite (logo, App.css), tạo thư mục `src/components`, `src/homeworks`
- [ ] T0.3: Thêm `project-rules.md`, `TASK_DECOMPOSITION.md`, tạo `AI_FAILURE_AUDIT.md` (tiêu đề rỗng)
- [ ] T0.4: Chạy `npm run dev`, xác nhận Console không có warning

**Commit:** `chore: init react19 vite & rules`

---

## EX 3: PubgMatchTelemetry (phút 120-155, 35 phút)

### Contract (tự viết trước khi nhờ AI)

```js
/**
 * PubgMatchTelemetry
 * Props: squadId: 'ces' | 'te' | 'ge' (default 'te')
 * State:
 *   view      : { status: 'IDLE'|'LOADING'|'SUCCESS'|'ERROR', data, error }
 *   retryTick : number   // tăng 1 để chạy lại effect
 * Effect deps: [squadId, retryTick]
 * Cleanup: controller.abort()
 * Cấm: window.alert, boolean soup, hiện lỗi khi AbortError
 */
```

### Danh sách task

- [ ] T3.1: Tạo `PUBG_VN_SQUADS` (Cerberus Esports, The Expendables, Genius Esports) và hàm giả lập `fetchKraftonPubgTelemetry(squadId, { signal })` có delay
- [ ] T3.2: Giả lập mất gói tin 35% (reject ngẫu nhiên) và tôn trọng `signal` (reject `AbortError` khi bị hủy)
- [ ] T3.3: State machine `view` + `useEffect` gọi fetch, cleanup `controller.abort()`
- [ ] T3.4: Trong `.catch`: bỏ qua `AbortError`, còn lại set `ERROR`
- [ ] T3.5: Bộ chọn đội (3 nút `type="button"`) để đổi `squadId`
- [ ] T3.6: Render trạng thái SUCCESS trong `<article aria-live="polite">`
- [ ] **Commit 1:** `feat(ex3): implement PUBG VN 4-state telemetry & AbortController`
- [ ] T3.7: Skeleton 220px khi LOADING (`aria-busy="true"`), đúng kích thước để CLS = 0
- [ ] T3.8: Trạng thái ERROR: `<section role="alert">` + nút "Reconnect Satellite" tăng `retryTick`
- [ ] **Commit 2:** `feat(ex3): add skeleton UI & retry alert`

### Checkpoint 3 (phút 155)

- [ ] DevTools > Network > Slow 3G: skeleton hiển thị, không giật layout (CLS 0.00)
- [ ] Bấm nhanh CES > TE > GE: Network thấy các request cũ `(canceled)`, không hiện lỗi giả
- [ ] Khi lỗi: thấy khối `role="alert"`, bấm Reconnect chạy lại được
- [ ] Không còn `window.alert` trong code (`grep -n 'alert(' src`)

---

## BLOCK 5: Chuẩn bị bảo vệ (phút 155-180)

- [ ] `AI_FAILURE_AUDIT.md`: ghi tối thiểu 3 lỗi AI thật (prompt, code AI, lỗi, bằng chứng DevTools, cách sửa + commit)
- [ ] Luyện 3 tình huống: (A) Watchlist không dùng useEffect, (B) auto-polling 5s + Pause + cleanup, (C) nâng `selectedId` lên `<App />`
- [ ] Đóng mọi công cụ AI trước khi gọi giảng viên

---

## Bảng tổng hợp commit

| # | Message | Thuộc |
|---|---|---|
| 1 | `chore: init react19 vite & rules` | Block 1 |
| 2 | `feat(ex1): implement semantic DeveloperCard and SkillBadge` | Ex 1 |
| 3 | `style(ex1): add responsive 375px CSS module` | Ex 1 |
| 4 | `feat(ex2): normalize smartPeople schema with stable IDs` | Ex 2 |
| 5 | `feat(ex2): add search, IQ filter & toSorted` | Ex 2 |
| 6 | `feat(ex2): add delete/reset & live status` | Ex 2 |
| 7 | `feat(ex3): implement PUBG VN 4-state telemetry & AbortController` | Ex 3 |
| 8 | `feat(ex3): add skeleton UI & retry alert` | Ex 3 |

Tổng 8 commit trong lớp, đã đạt mức tối thiểu 6-8 của slide. Các commit sửa lỗi nhỏ (`fix:`) hoặc `docs: add AI_FAILURE_AUDIT` có thể thêm sau để lịch sử tự nhiên hơn.
