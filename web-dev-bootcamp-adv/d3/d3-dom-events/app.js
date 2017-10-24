const input = d3.select('input');
const preview = d3.select('.preview');

const setValue = val => {
  preview.text(val).classed('hide', val === '');
};

d3.select('.remove').on('click', () => {
  d3.selectAll('.note').remove();
});

d3.select('.lucky').on('click', () => {
  d3.selectAll('.note').style('font-size', () => {
    return Math.random() * 100 + 'px';
  });
});

d3.select('#new-note').on('submit', () => {
  d3.event.preventDefault();

  if (!input.property('value')) return;

  d3
    .select('#notes')
    .append('p')
    .classed('note', true)
    .text(input.property('value'));

  input.property('value', '');
  setValue('');
});

input.on('input', () => {
  const note = d3.event.target.value;
  setValue(note);
});
