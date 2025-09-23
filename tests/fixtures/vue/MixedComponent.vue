<template>
  <div class="chart-container">
    <canvas ref="chartCanvas" :width="width" :height="height"></canvas>
    <div class="controls">
      <button @click="updateData">Update Data</button>
      <select v-model="chartType" @change="renderChart">
        <option value="bar">Bar Chart</option>
        <option value="line">Line Chart</option>
        <option value="pie">Pie Chart</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChartComponent',
  props: {
    data: Array,
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 300,
    },
  },
  data() {
    return {
      chartType: 'bar',
      chartInstance: null,
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      const canvas = this.$refs.chartCanvas;
      const ctx = canvas.getContext('2d');

      this.chartInstance = {
        canvas,
        ctx,
        data: this.data || [],
      };

      this.renderChart();
    },
    renderChart() {
      if (!this.chartInstance) return;

      const { ctx, canvas } = this.chartInstance;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      switch (this.chartType) {
        case 'bar':
          this.drawBarChart();
          break;
        case 'line':
          this.drawLineChart();
          break;
        case 'pie':
          this.drawPieChart();
          break;
      }
    },
    drawBarChart() {
      console.log('Drawing bar chart...');
    },
    drawLineChart() {
      console.log('Drawing line chart...');
    },
    drawPieChart() {
      console.log('Drawing pie chart...');
    },
    updateData() {
      this.$emit('data-update-requested');
    },
  },
};
</script>

<style scoped>
.chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.controls {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

canvas {
  border: 1px solid #ddd;
}
</style>
