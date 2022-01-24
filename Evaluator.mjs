const GAP_WEIGHT = {
  1: -5,
  2: -5,
  3: -5,
  4: -5,
  5: -4,
  6: -4,
  7: -3,
  8: -3,
  9: -3,
  10: -3,
  11: -2,
  12: -2,
  13: -2,
  14: -2,
  15: -2,
  16: -2,
  17: 0,
  18: 0,
  19: 0,
  20: 0,
};

const CLEARED_WEIGHT = {
  1: 1,
  2: 1,
  3: 1,
  4: 1,
  5: 1,
  6: 1,
  7: 1,
  8: 1,
  9: 1,
  10: 2,
  11: 2,
  12: 2,
  13: 3,
  14: 3,
  15: 3,
  16: 5,
  17: 5,
  18: 5,
  19: 5,
  20: 5,
};

const MAX_HEIGHT_WEIGHT = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: -1,
  6: -1,
  7: -1,
  8: -1,
  9: -1,
  10: -2,
  11: -2,
  12: -2,
  13: -2,
  14: -2,
  15: -2,
  16: -3,
  17: -3,
  18: -3,
  19: -3,
  20: -3,
};

const HEIGHT_DIFF_WEIGHT = {
  1: -1,
  2: -1,
  3: -1,
  4: -1,
  5: -1,
  6: -1,
  7: -1,
  8: -1,
  9: -1,
  10: -2,
  11: -2,
  12: -2,
  13: -2,
  14: -2,
  15: -2,
  16: -3,
  17: -3,
  18: -3,
  19: -3,
  20: -3,
};

export class Evaluator {
  static getScore(gaps, clearedRows, heightStats) {
    // const score =
    const a = this.getGapScore(gaps, heightStats.maxHeight);
    const b = this.getClearedRowsScore(clearedRows, heightStats.maxHeight);
    const c = this.getMaxHeightScore(heightStats.maxHeight);
    const d = this.getHeightDiffScore(
      heightStats.minHeight,
      heightStats.maxHeight
    );

    return a + b + c + d;
  }

  static getGapScore(gaps, height) {
    let weight = GAP_WEIGHT[height];

    return gaps * weight;
  }

  static getClearedRowsScore(clearedRows, height) {
    let weight = CLEARED_WEIGHT[height];

    if (clearedRows === 4) {
      return 10000;
    } else {
      return clearedRows * clearedRows * weight;
    }
  }

  static getMaxHeightScore(height) {
    const weight = MAX_HEIGHT_WEIGHT[height];
    return weight * height;
  }

  static getHeightDiffScore(minHeight, maxHeight) {
    const weight = HEIGHT_DIFF_WEIGHT[maxHeight];
    return weight * (maxHeight - minHeight);
  }
}
