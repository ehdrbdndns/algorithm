const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, L, LD, LT, LHH, LMM, F, LTotalMinute;
let rentalList = new Map();
let fineList = new Map();
rl.question('', (answer) => {
  [N, L, F] = answer.split(' ');
  [LD, LT] = L.split('/');
  [LHH, LMM] = LT.split(':').map((i) => Number(i));
  LTotalMinute = Number(LD) * 1440 + LHH * 60 + LMM;

  rl.on('line', solution).on('close', closeListener);
});

function solution(line) {
  const [date, time, item, user] = line.split(' ');

  const rentalKey = item + ' ' + user;
  if (rentalList.has(rentalKey)) {
    const [, MM, dd] = date.split('-').map((i) => Number(i));
    const [hh, mm] = time.split(':').map((i) => Number(i));

    let defMonth = 0;
    let defDay = 0;
    let defHour = 0;
    let defMinute = 0;
    const rentalData = rentalList.get(rentalKey);
    let [rentalDate, rentalTime] = rentalData.split(' ');
    let [rentalYear, rentalMonth, rentalDay] = rentalDate
      .split('-')
      .map((i) => Number(i));
    const [rentalHH, rentalMM] = rentalTime.split(':').map((i) => Number(i));

    defMonth = MM - rentalMonth;

    if (defMonth) {
      for (let i = 0; i <= defMonth; i++) {
        if (i === 0) {
          defDay += new Date(rentalYear, rentalMonth, 0).getDate() - rentalDay;
        } else if (i === defMonth) {
          defDay += dd;
        } else {
          defDay += new Date(rentalYear, rentalMonth + i, 0).getDate();
        }
      }
    } else {
      defDay = dd - rentalDay;
    }

    if (defDay) {
      for (let i = 0; i <= defDay; i++) {
        if (i === 0) {
          // 결과 보고 23으로 변경 예정
          defHour += 24 - rentalHH;
        } else if (i === defDay) {
          defHour += hh;
        } else {
          defHour += 24;
        }
        // console.log(defHour);
      }
    } else {
      defHour = hh - rentalHH;
    }

    if (defHour) {
      for (let i = 0; i <= defHour; i++) {
        if (i === 0) {
          // 결과 보고 59로 변경 예정
          defMinute += 60 - rentalMM;
        } else if (i === defHour) {
          defMinute += mm;
        } else {
          defMinute += 60;
        }
      }
    } else {
      defMinute = mm - rentalMM;
    }

    const isFine = defMinute - LTotalMinute;
    if (isFine > 0) {
      // 벌금
      const fine = fineList.has(user)
        ? isFine * F + fineList.get(user)
        : isFine * F;

      fineList.set(user, fine);
    }

    // 렌탈 삭제
    rentalList.delete(rentalKey);
  } else {
    // 빌린 리스트 삽입
    rentalList.set(rentalKey, date + ' ' + time);
  }
}

function closeListener() {
  const sortedFineList = [];
  fineList.forEach((v, k) => {
    sortedFineList.push(k);
  });
  sortedFineList.sort();

  const result = [];

  if (sortedFineList.length) {
    sortedFineList.forEach((v) => {
      result.push(`${v} ${fineList.get(v)}`);
    });
  } else {
    result.push(-1);
  }

  console.log(result.join('\n'));
  process.exit();
}
