#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
描述性统计分析模块
提供各种统计分析功能
"""

import numpy as np
from scipy import stats
from typing import List, Dict, Any


def calculate_descriptive_stats(data: List[float]) -> Dict[str, Any]:
    """
    计算描述性统计分析指标
    
    Args:
        data: 输入数据列表
        
    Returns:
        包含各种统计指标的字典
        
    Raises:
        ValueError: 当输入数据为空或不是数值列表时
    """
    if not data or not all(isinstance(x, (int, float)) for x in data):
        raise ValueError("数据必须是一个非空的数值列表")
    
    # 转换为numpy数组以便计算
    np_data = np.array(data)
    
    # 计算众数
    mode_result = stats.mode(np_data)
    mode = mode_result.mode[0] if len(mode_result.mode) > 0 else None
    
    # 计算四分位数
    q1 = np.percentile(np_data, 25)
    q3 = np.percentile(np_data, 75)
    
    # 计算统计指标
    stats_dict = {
        'count': len(np_data),
        'sum': float(np.sum(np_data)),
        'mean': float(np.mean(np_data)),
        'median': float(np.median(np_data)),
        'mode': float(mode) if mode is not None else None,
        'variance': float(np.var(np_data)),
        'std_dev': float(np.std(np_data)),
        'min': float(np.min(np_data)),
        'max': float(np.max(np_data)),
        'range': float(np.ptp(np_data)),
        'q1': float(q1),
        'q3': float(q3),
        'iqr': float(stats.iqr(np_data))
    }
    
    return stats_dict


def calculate_correlation(x: List[float], y: List[float]) -> float:
    """
    计算两个变量之间的相关系数
    
    Args:
        x: 第一个变量的数据列表
        y: 第二个变量的数据列表
        
    Returns:
        相关系数
        
    Raises:
        ValueError: 当输入数据不符合要求时
    """
    if not x or not y:
        raise ValueError("输入数据不能为空")
    
    if len(x) != len(y):
        raise ValueError("两个变量的数据长度必须相同")
    
    if not all(isinstance(val, (int, float)) for val in x + y):
        raise ValueError("所有数据必须是数值类型")
    
    # 计算皮尔逊相关系数
    correlation = float(np.corrcoef(x, y)[0, 1])
    
    return correlation


def linear_regression(x: List[float], y: List[float]) -> Dict[str, Any]:
    """
    执行线性回归分析
    
    Args:
        x: 自变量数据列表
        y: 因变量数据列表
        
    Returns:
        包含回归分析结果的字典
        
    Raises:
        ValueError: 当输入数据不符合要求时
    """
    if not x or not y:
        raise ValueError("输入数据不能为空")
    
    if len(x) != len(y):
        raise ValueError("两个变量的数据长度必须相同")
    
    if not all(isinstance(val, (int, float)) for val in x + y):
        raise ValueError("所有数据必须是数值类型")
    
    # 转换为numpy数组
    np_x = np.array(x)
    np_y = np.array(y)
    
    # 执行线性回归
    slope, intercept, r_value, p_value, std_err = stats.linregress(np_x, np_y)
    
    # 计算拟合值
    fitted_values = slope * np_x + intercept
    
    # 计算残差
    residuals = np_y - fitted_values
    
    # 返回结果
    result = {
        'slope': float(slope),
        'intercept': float(intercept),
        'r_squared': float(r_value ** 2),
        'p_value': float(p_value),
        'std_error': float(std_err),
        'fitted_values': fitted_values.tolist(),
        'residuals': residuals.tolist()
    }
    
    return result