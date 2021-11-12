
HTML = `<h1> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit amet 
pretium nisl. Fusce consectetur vel mi vitae facilisis. 
Nullam sodales dapibus sollicitudin. Quisque quis risus vitae felis consequat 
viverra a et est. Fusce lacinia mauris nulla, eu lacinia magna congue id. Nulla facilisi. 
Integer non urna eros. Sed tincidunt sed odio vitae varius. Vestibulum maximus dui sit amet commodo bibendum. 
Proin tristique purus ac nulla consectetur, vel convallis eros dictum. Suspendisse ultricies suscipit nunc eget dapibus. 
In id bibendum metus. Integer rutrum fermentum tortor 
a feugiat. Praesent bibendum tristique arcu</h1>.<h2>Proin dignissim odio vel nibh ornare dictum.</h2> `;

const ENTER = /<[^/>]*>/g;
const EXIT = /<\/[^>]*>/g;

const parseHTML = (HTML) => {
  HTML = HTML.replace(/</g, " <").replace(/>/g, "> ");
  const array = HTML.split(" ");
  let pipeline = [];
  let text = [];
  let inBlock = false;
  let commandStart = "";

  for (let i = 0; i < array.length; i++) {
    if (inBlock) {
      if (array[i].match(EXIT)?.length) {
        inBlock = false;
        let commandEnd = array[i].substring(2, array[i].length - 1);
        pipeline.push({
          commandStart,
          commandEnd,
          text: text.join(" ").trim(),
          match: commandStart === commandEnd,
        });
        text = [];
      } else {
        text.push(array[i]);
      }
    } else if (array[i].match(ENTER)?.length) {
      inBlock = true;
      commandStart = array[i].substring(1, array[i].length - 1);
    }
  }
  return pipeline;
};


console.log(parseHTML(HTML));
