/**
 * 描述性统计分析函数
 * @param {number[]} data - 输入数据数组
 * @returns {Object} 包含各种统计指标的对象
 */
export function calculateDescriptiveStats(data) {
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('数据必须是一个非空数组');
  }

  // 计算总和
  const sum = data.reduce((acc, val) => acc + val, 0);
  
  // 计算平均值
  const mean = sum / data.length;
  
  // 计算中位数
  const sortedData = [...data].sort((a, b) => a - b);
  const midIndex = Math.floor(sortedData.length / 2);
  const median = sortedData.length % 2 === 0 
    ? (sortedData[midIndex - 1] + sortedData[midIndex]) / 2
    : sortedData[midIndex];
  
  // 计算众数
  const frequencyMap = {};
  data.forEach(val => {
    frequencyMap[val] = (frequencyMap[val] || 0) + 1;
  });
  const maxFreq = Math.max(...Object.values(frequencyMap));
  const mode = Object.keys(frequencyMap)
    .filter(key => frequencyMap[key] === maxFreq)
    .map(Number);
  
  // 计算方差
  const variance = data.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / data.length;
  
  // 计算标准差
  const stdDev = Math.sqrt(variance);
  
  // 计算最小值和最大值
  const min = Math.min(...data);
  const max = Math.max(...data);
  
  // 计算极差
  const range = max - min;
  
  return {
    count: data.length,
    sum,
    mean,
    median,
    mode,
    variance,
    stdDev,
    min,
    max,
    range
  };
}

/**
 * 计算数据的相关性系数
 * @param {number[]} x - 第一个数据数组
 * @param {number[]} y - 第二个数据数组
 * @returns {number} 相关系数
 */
export function calculateCorrelation(x, y) {
  if (!Array.isArray(x) || !Array.isArray(y) || x.length !== y.length || x.length === 0) {
    throw new Error('两个数据数组必须长度相同且非空');
  }
  
  const n = x.length;
  const sumX = x.reduce((acc, val) => acc + val, 0);
  const sumY = y.reduce((acc, val) => acc + val, 0);
  const sumXY = x.reduce((acc, val, i) => acc + val * y[i], 0);
  const sumX2 = x.reduce((acc, val) => acc + val * val, 0);
  const sumY2 = y.reduce((acc, val) => acc + val * val, 0);
  
  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
  
  return denominator === 0 ? 0 : numerator / denominator;
}