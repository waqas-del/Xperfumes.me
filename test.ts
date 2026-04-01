import Papa from 'papaparse';

async function test() {
  const res = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vR-DPbyadf4F8LFQ8zmZfnTDrfmknmOk9IijaeSv2wDATIiz_33PZLVsp7jGlrYHPYlZfAhhqzONv8d/pub?output=csv');
  const text = await res.text();
  const parsed = Papa.parse(text, { header: true });
  console.log(parsed.meta.fields);
  console.log(parsed.data[0]);
}

test();
