const { abs, round, floor, log10, pow } = Math;

const scaleStrategies = {

  linear: {
    getPercentage(min, max, value) {
      return (value - min) / (max - min) * 100;
    },

    getValue(min, max, percentage) {
      return (max - min) * (percentage / 100) + min;
    },
  },

  logarithmic: {
    getPercentage(_min, _max, _value) {
      const max   = _max || 1;
      const min   = _min || 1;
      const value = _value || 1;

      if (min >= 0 && max >= 0) {
        const power = log10(value / min);
        const range = log10(max / min);
        const closestIntegerPower = floor(power);

        return 100 * (closestIntegerPower / range) + 100 * (power % 1 / range);
      } else if (min < 0 && max >= 0) {
        const absoluteMin = abs(min);
        const absoluteMax = abs(max);
        const distance = absoluteMin + absoluteMax;
        const zeroPointCoefficient = absoluteMin / distance;
        const zeroPointPercentage =  zeroPointCoefficient * 100;

        if (value >= 0) {
          const valueAtRightHalf = 100 * (log10(value) / log10(max)) * (max / distance);
          return zeroPointPercentage + valueAtRightHalf;
        } else {
          const progress = log10(-value) / log10(absoluteMin);
          const minPartProportion = (absoluteMin / distance);
          const valueAtLeftHalf = 100 * progress * minPartProportion;
          return zeroPointPercentage - valueAtLeftHalf;
        }
      } else {
        return 100 - scaleStrategies.logarithmic.getPercentage(-min, -max, -value);
      }
    },

    getValue(_min, _max, percentage) {
      const max = _max || 1;
      const min = _min || 1;

      if (min >= 0 && max >= 0) {
        const range  = log10(max / min);
        const offset = log10(min);
        const power  = range * (percentage / 100) + offset;
        const closestIntegerPower = floor(power);

        const value = pow(10, power);
        return round(value / pow(10, closestIntegerPower)) * pow(10, closestIntegerPower);
      } else if (min < 0 && max >= 0) {
        const absoluteMin = abs(min);
        const absoluteMax = abs(max);
        const distance = absoluteMin + absoluteMax;
        const zeroPointCoefficient = absoluteMin / distance;
        const zeroPointPercentage =  zeroPointCoefficient * 100;

        const absolutePercentage = percentage - zeroPointPercentage;
        if (absolutePercentage >= 0) {
          let relativePercentage = absolutePercentage / (absoluteMax / distance);
          return scaleStrategies.logarithmic.getValue(0, absoluteMax, relativePercentage);
        } else {
          let relativePercentage = -absolutePercentage / (absoluteMin / distance);
          return -scaleStrategies.logarithmic.getValue(0, absoluteMin, relativePercentage);
        }
      } else {
        return -scaleStrategies.logarithmic.getValue(-max, -min, percentage);
      }
    },
  },

};

export default scaleStrategies;
