/**
 * core/helpers.js — SVG 绘图工具函数
 *
 * 全局挂载为 window.AgentSpecHelpers
 * 章节文件通过 const S = window.AgentSpecHelpers 使用
 */
(function () {
  const H = {
    /**
     * 绘制圆角矩形 + 标题 + 可选副标题
     */
    box(x, y, w, h, col, text, sub = '', rx = 6) {
      const textY = sub ? y + h / 2 - 7 : y + h / 2 + 5;
      return `
        <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}"
          fill="${col}18" stroke="${col}" stroke-width="1.5"/>
        <text x="${x + w / 2}" y="${textY}" text-anchor="middle"
          fill="${col}" font-family="'JetBrains Mono',monospace" font-size="13" font-weight="500">${text}</text>
        ${sub ? `<text x="${x + w / 2}" y="${y + h / 2 + 11}" text-anchor="middle"
          fill="${col}99" font-family="'JetBrains Mono',monospace" font-size="10">${sub}</text>` : ''}`;
    },

    /**
     * 绘制单行文字标签
     */
    label(x, y, text, col = '#6b84a8', size = 11) {
      return `<text x="${x}" y="${y}" text-anchor="middle"
        fill="${col}" font-family="'JetBrains Mono',monospace" font-size="${size}">${text}</text>`;
    },

    /**
     * 带箭头的直线
     */
    arrow(x1, y1, x2, y2, col = '#6b84a8', label = '', markerId = 'arr') {
      const dx = x2 - x1, dy = y2 - y1;
      const len = Math.sqrt(dx * dx + dy * dy);
      const nx = dx / len, ny = dy / len;
      const ax = x2 - nx * 10, ay = y2 - ny * 10;
      const lx = (x1 + x2) / 2, ly = (y1 + y2) / 2;
      return `
        <line x1="${x1}" y1="${y1}" x2="${ax}" y2="${ay}"
          stroke="${col}" stroke-width="1.5" marker-end="url(#${markerId})"/>
        ${label ? `<text x="${lx}" y="${ly - 6}" text-anchor="middle"
          fill="${col}" font-family="'JetBrains Mono',monospace" font-size="10">${label}</text>` : ''}`;
    },

    /**
     * 虚线连接
     */
    dashed(x1, y1, x2, y2, col = '#2a4578') {
      return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"
        stroke="${col}" stroke-width="1.2" stroke-dasharray="4 3"/>`;
    },

    /**
     * 颜色常量
     */
    c: {
      cyan:   '#00c8ff',
      amber:  '#ffb800',
      green:  '#00e599',
      red:    '#ff4d6d',
      purple: '#a78bfa',
      dim:    '#1e3058',
      dim2:   '#2a4578',
      bg:     '#070b14',
      bg2:    '#0d1526',
      text:   '#c9d8f0',
      textDim:'#6b84a8',
    }
  };

  window.AgentSpecHelpers = H;
})();
