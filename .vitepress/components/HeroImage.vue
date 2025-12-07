<script setup>
import { ref, computed } from 'vue'

const cardRef = ref(null)

// 响应式数据：记录旋转角度
const rotateX = ref(0)
const rotateY = ref(0)
const shineX = ref(0)
const shineY = ref(0)
const isHovering = ref(false)

// 鼠标移动处理函数
const handleMouseMove = (e) => {
  if (!cardRef.value) return

  const rect = cardRef.value.getBoundingClientRect()
  // 计算鼠标在卡片内的相对位置 (0 到 1)
  const x = (e.clientX - rect.left) / rect.width
  const y = (e.clientY - rect.top) / rect.height

  // 计算旋转角度 (范围 -15deg 到 15deg)
  // Y轴旋转取决于鼠标X轴位置，X轴旋转取决于鼠标Y轴位置(反向)
  const rY = (x - 0.5) * 30 
  const rX = (0.5 - y) * 30 

  rotateY.value = rY
  rotateX.value = rX

  // 计算高光位置
  shineX.value = x * 100
  shineY.value = y * 100
  
  isHovering.value = true
}

// 鼠标离开，复位
const handleMouseLeave = () => {
  rotateX.value = 0
  rotateY.value = 0
  isHovering.value = false
}

// 计算 CSS 变量样式
const cardStyle = computed(() => ({
  transform: `perspective(1000px) rotateX(${rotateX.value}deg) rotateY(${rotateY.value}deg)`,
  transition: isHovering.value ? 'none' : 'transform 0.5s ease-out', // 移动时无过渡防卡顿，离开时平滑复位
}))

const shineStyle = computed(() => ({
  background: `radial-gradient(circle at ${shineX.value}% ${shineY.value}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 80%)`
}))
</script>

<template>
  <div class="card-container">
    <div 
      ref="cardRef"
      class="game-card" 
      :style="cardStyle"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseLeave"
    >
      <div class="layer background"></div>
      
      <div class="layer watermark">SHI YU QI</div>
      
      <div class="layer character">
        <img src="https://img.olympics.com/images/image/private/t_s_w960/t_s_16_9_g_auto/f_auto/primary/ufr8p1k9w5cphx2yvpyd" alt="Shi Yuqi Smash" width=240 height=360 />
      </div>

      <div class="layer content">
        <div class="badge">CN | #1</div>
        <h2>THE STONE</h2>
        <p>Smash the limits.</p>
      </div>

      <div class="layer shine" :style="shineStyle"></div>
    </div>
  </div>
</template>

<style scoped>
.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
  perspective: 1000px; /* 这一步至关重要，决定3D的纵深感 */
}

.game-card {
  position: relative;
  width: 240px;
  height: 360px;
  background: linear-gradient(135deg, #1a1a1a, #2c0003); /* 深红黑配色 */
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  transform-style: preserve-3d; /* 让子元素也保持3D效果 */
  overflow: hidden;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* 让鼠标事件穿透到卡片本身 */
}

/* 层级 1: 背景 */
.background {
  background-image: url('https://www.transparenttextures.com/patterns/carbon-fibre.png');
  opacity: 0.3;
  transform: translateZ(20px); /* Z轴位移产生视差 */
}

/* 层级 2: 水印文字 */
.watermark {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8rem;
  font-weight: 900;
  color: rgba(230, 0, 18, 0.1); /* 淡淡的中国红 */
  transform: translateZ(40px) rotate(-90deg);
  white-space: nowrap;
  letter-spacing: 10px;
}

/* 层级 3: 人物图片 */
.character {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  transform: translateZ(60px) scale(1.1); /* 人物最突出 */
  overflow: hidden;
}

.character img {
  width: 130%; /* 稍微放大一点填满 */
  height: auto;
  object-fit: cover;
  mask-image: linear-gradient(to top, black 60%, transparent 100%); /* 底部渐变融合 */
  -webkit-mask-image: linear-gradient(to top, black 60%, transparent 100%);
  filter: drop-shadow(0 10px 20px rgba(0,0,0,0.5));
}

/* 层级 4: 文字内容 */
.content {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 30px;
  color: white;
  transform: translateZ(90px); /* 浮动在最上层 */
  text-shadow: 0 4px 8px rgba(0,0,0,0.6);
}

.badge {
  background: #E60012;
  width: fit-content;
  padding: 4px 8px;
  font-weight: bold;
  font-size: 0.8rem;
  border-radius: 4px;
  margin-bottom: 8px;
}

.content h2 {
  font-family: 'Oswald', sans-serif; /* 推荐引入这个字体 */
  font-size: 3rem;
  line-height: 1;
  margin: 0;
  background: linear-gradient(to right, #fff, #ffd700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-style: italic;
}

.content p {
  margin: 5px 0 0;
  font-size: 1rem;
  opacity: 0.8;
  letter-spacing: 2px;
}

/* 层级 5: 光效 */
.shine {
  mix-blend-mode: overlay; /* 混合模式，让高光更自然 */
  transform: translateZ(100px);
}
</style>
