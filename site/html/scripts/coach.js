function createcoachBlock(coachData) {
    const coachLink = document.createElement('a');
    coachLink.href = '#!';
    coachLink.className = 'coach-link';
  
    const blockImg = document.createElement('div');
    blockImg.className = 'block-img';

    const compImg = document.createElement('img');
    compImg.className = 'comp-img';
    compImg.src = './img/comp_img.svg';
    compImg.alt = '';
    blockImg.appendChild(compImg);
    coachLink.appendChild(blockImg);
  
    const textContainerFlex = document.createElement('div');
    textContainerFlex.className = 'text-container-flex';
  
    const textContainer1 = document.createElement('div');
    textContainer1.className = 'text-container';
    const textcoach1 = document.createElement('div');
    textcoach1.className = 'text-coach1';
    textcoach1.textContent = coachData.title;
    const textcoach2 = document.createElement('div');
    textcoach2.className = 'text-coach2';
    textcoach2.textContent = coachData.description;
    textContainer1.appendChild(textcoach1);
    textContainer1.appendChild(textcoach2);
    textContainerFlex.appendChild(textContainer1);
  
    const textContainer2 = document.createElement('div');
    textContainer2.className = 'text-container';
    const textcoach3 = document.createElement('div');
    textcoach3.className = 'text-coach3';
    textcoach3.textContent = coachData.price;
    const textcoach4 = document.createElement('div');
    textcoach4.className = 'text-coach3';
    textcoach4.textContent = coachData.price_per_month;
    textContainer2.appendChild(textcoach3);
    textContainer2.appendChild(textcoach4);
    textContainerFlex.appendChild(textContainer2);
  
    coachLink.appendChild(textContainerFlex);
  
    const separator = document.createElement('div');
    separator.className = 'separator';
    const sepImg = document.createElement('img');
    sepImg.className = 'sep-img';
    sepImg.src = './img/separator.svg';
    sepImg.alt = '';
    separator.appendChild(sepImg);
    coachLink.appendChild(separator);
  
    const compInfo = document.createElement('div');
    compInfo.className = 'comp-info';
  
    const createCompSpec = (iconSrc, text) => {
      const compSpec = document.createElement('div');
      compSpec.className = 'comp-spec';
      const icon = document.createElement('img');
      icon.src = iconSrc;
      icon.alt = '';
      const textSpec = document.createElement('div');
      textSpec.className = 'text-spec';
      textSpec.textContent = text;
      compSpec.appendChild(icon);
      compSpec.appendChild(textSpec);
      return compSpec;
    };
  
    compInfo.appendChild(createCompSpec('./img/icon-gpu.svg', coachData.gpu));
    compInfo.appendChild(createCompSpec('./img/icon-cpu.svg', coachData.cpu));
    compInfo.appendChild(createCompSpec('./img/icon-temp.svg', coachData.cooling));
    compInfo.appendChild(createCompSpec('./img/icon-ram.svg', coachData.ram));
  
    coachLink.appendChild(compInfo);
  
    return coachLink;
  }
  
  fetch('http://localhost:3000/coach')
    .then(response => response.json())
    .then(data => {
      const coachContainer = document.getElementById('coachContainer');
      data.coach.forEach(coach => {
        const coachLink = createcoachBlock(coach);
        coachContainer.appendChild(coachLink);
      });
    })
    .catch(error => {
      console.error('Ошибка при получении данных о тренеровках:', error);
    });
  