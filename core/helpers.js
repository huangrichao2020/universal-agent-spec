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
     * 水平时间线，items 是 [{label, sub?}] 数组
     * 自动等距分布节点，每个节点是圆点+标签
     */
    timeline(x, y, width, items, col = '#00c8ff') {
      const gap = width / (items.length - 1 || 1)
      let svg = `<line x1="${x}" y1="${y}" x2="${x + width}" y2="${y}" stroke="${col}" stroke-width="1.5"/>`
      items.forEach((item, i) => {
        const cx = x + gap * i
        svg += `<circle cx="${cx}" cy="${y}" r="5" fill="${col}"/>`
        svg += `<text x="${cx}" y="${y - 12}" text-anchor="middle" fill="${col}" font-family="'JetBrains Mono',monospace" font-size="11" font-weight="500">${item.label}</text>`
        if (item.sub) {
          svg += `<text x="${cx}" y="${y + 18}" text-anchor="middle" fill="${col}88" font-family="'JetBrains Mono',monospace" font-size="9">${item.sub}</text>`
        }
      })
      return svg
    },

    /**
     * 垂直分层堆叠图，layers 是 [{label, col, sub?}] 数组（从上到下）
     * 每层是一个圆角矩形，自动计算 y 位置
     */
    layerStack(x, y, w, layers, gap = 8) {
      const h = 40
      let svg = ''
      layers.forEach((layer, i) => {
        const ly = y + i * (h + gap)
        svg += this.box(x, ly, w, h, layer.col, layer.label, layer.sub || '')
      })
      return svg
    },

    /**
     * 简单状态机：states 是 [{label, angle?, col?}] 数组，
     * transitions 是 [{from, to, label?}] 数组（index 指向 states）
     * 状态节点均匀分布在以 (cx,cy) 为中心、半径 r 的圆上
     */
    stateMachine(cx, cy, r, states, transitions = []) {
      let svg = ''
      const positions = states.map((s, i) => {
        const angle = (s.angle !== undefined ? s.angle : (i * 360 / states.length)) * Math.PI / 180
        return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }
      })
      // 画转移箭头
      transitions.forEach(t => {
        const from = positions[t.from], to = positions[t.to]
        svg += this.arrow(from.x, from.y, to.x, to.y, '#6b84a8', t.label || '')
      })
      // 画状态节点
      states.forEach((s, i) => {
        const p = positions[i]
        svg += `<circle cx="${p.x}" cy="${p.y}" r="22" fill="${(s.col || '#00c8ff')}18" stroke="${s.col || '#00c8ff'}" stroke-width="1.5"/>`
        svg += `<text x="${p.x}" y="${p.y + 4}" text-anchor="middle" fill="${s.col || '#00c8ff'}" font-family="'JetBrains Mono',monospace" font-size="10" font-weight="500">${s.label}</text>`
      })
      return svg
    },

    /**
     * 简化时序图：actors 是 [{label, col}] 数组，
     * messages 是 [{from, to, label, dashed?}] 数组（from/to 是 actor index）
     */
    sequence(x, y, actors, messages, actorWidth = 130, msgGap = 36) {
      let svg = ''
      const totalH = y + 50 + messages.length * msgGap
      // 画参与者标签和生命线
      actors.forEach((a, i) => {
        const ax = x + i * actorWidth + actorWidth / 2
        svg += `<text x="${ax}" y="${y}" text-anchor="middle" fill="${a.col || '#00c8ff'}" font-family="'JetBrains Mono',monospace" font-size="12" font-weight="500">${a.label}</text>`
        svg += `<line x1="${ax}" y1="${y + 8}" x2="${ax}" y2="${totalH}" stroke="${a.col || '#00c8ff'}44" stroke-width="1" stroke-dasharray="4 3"/>`
      })
      // 画消息
      messages.forEach((m, i) => {
        const my = y + 30 + i * msgGap
        const fx = x + m.from * actorWidth + actorWidth / 2
        const tx = x + m.to * actorWidth + actorWidth / 2
        if (m.dashed) {
          svg += this.dashed(fx, my, tx, my, '#6b84a8')
          if (m.label) {
            svg += `<text x="${(fx + tx) / 2}" y="${my - 6}" text-anchor="middle" fill="#6b84a8" font-family="'JetBrains Mono',monospace" font-size="10">${m.label}</text>`
          }
        } else {
          svg += this.arrow(fx, my, tx, my, '#6b84a8', m.label || '')
        }
      })
      return svg
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
