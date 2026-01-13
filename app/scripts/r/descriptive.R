#' 描述性统计分析函数
#' @param data 输入数据向量
#' @return 包含各种统计指标的列表
calculate_descriptive_stats <- function(data) {
  if (!is.numeric(data) || length(data) == 0) {
    stop("数据必须是一个非空的数值向量")
  }
  
  # 计算基本统计量
  stats <- list(
    count = length(data),
    sum = sum(data),
    mean = mean(data),
    median = median(data),
    mode = names(which.max(table(data))),
    variance = var(data),
    std_dev = sd(data),
    min = min(data),
    max = max(data),
    range = max(data) - min(data),
    q1 = quantile(data, 0.25),
    q3 = quantile(data, 0.75),
    iqr = IQR(data)
  )
  
  return(stats)
}

#' 计算两个变量的相关性
#' @param x 第一个变量向量
#' @param y 第二个变量向量
#' @return 相关系数
calculate_correlation <- function(x, y) {
  if (!is.numeric(x) || !is.numeric(y) || length(x) != length(y) || length(x) == 0) {
    stop("两个变量必须是长度相同的非空数值向量")
  }
  
  return(cor(x, y))
}

#' 线性回归分析
#' @param x 自变量向量
#' @param y 因变量向量
#' @return 回归分析结果
linear_regression <- function(x, y) {
  if (!is.numeric(x) || !is.numeric(y) || length(x) != length(y) || length(x) == 0) {
    stop("自变量和因变量必须是长度相同的非空数值向量")
  }
  
  model <- lm(y ~ x)
  summary <- summary(model)
  
  result <- list(
    coefficients = coefficients(model),
    r_squared = summary$r.squared,
    adjusted_r_squared = summary$adj.r.squared,
    p_value = summary$coefficients[2, 4],
    residuals = residuals(model),
    fitted_values = fitted.values(model)
  )
  
  return(result)
}