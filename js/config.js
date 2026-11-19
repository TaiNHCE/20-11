const tribute = {
  letter: [
    'Nhân ngày Nhà giáo Việt Nam 20/11, chúng em xin gửi đến cô những lời chúc tốt đẹp nhất.',
    'Cảm ơn cô vì những bài học, sự tận tâm và những kỷ niệm đẹp trong suốt thời gian qua.',
    'Chúc cô luôn mạnh khỏe, hạnh phúc và mãi giữ được ngọn lửa yêu nghề.',
    'Chúng em luôn biết ơn và trân trọng cô!'
  ],
  captions: ['Một thời áo trắng', 'Bó hoa dành tặng cô', 'Ngày vui bên cô', 'Cô và chúng em', 'Kỷ niệm ngày tổng kết', 'Nắng sân trường'],
  descriptions: ['Cả lớp tặng hoa cô trước bảng xanh', 'Cô mặc áo dài hồng và ôm bó hoa', 'Cô và cả lớp trong phòng học', 'Cô và các bạn giữa căn phòng trang trí bóng bay', 'Cô và các bạn chụp ảnh cùng giấy khen', 'Cô và các bạn mặc áo dài trên sân trường'],
  wishes: ['Chúc cô luôn mạnh khỏe và bình an.', 'Mong cô có thật nhiều niềm vui mỗi ngày.', 'Chúc cô luôn gặp những lớp học trò đáng yêu.', 'Mong nụ cười mãi ở lại trên môi cô.', 'Cảm ơn cô đã cho chúng em những năm tháng đáng nhớ.'],
  secret: 'Dù mai này mỗi đứa một nơi, chúng em vẫn nhớ những ngày được học cùng cô.',
  slideDuration: 6200
};

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const find = (selector, root = document) => root.querySelector(selector);
const all = (selector, root = document) => [...root.querySelectorAll(selector)];
