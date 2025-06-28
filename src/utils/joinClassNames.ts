/**
 * 여러 클래스네임을 안전하게 합치는 유틸 함수
 * @param args - 합칠 클래스네임 배열
 * @returns 합쳐진 클래스네임
 */
export const joinClassNames = (...args: (string | undefined | false | null)[]) => {
  return args.filter(Boolean).join(' ');
};
