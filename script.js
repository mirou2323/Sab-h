let todayDate = new Date().toLocaleDateString();
let storedDate = localStorage.getItem('tasbih-date') || '';

// إذا تغير التاريخ، نعيد تعيين العدادات لكل نوع ذكر
if (storedDate !== todayDate) {
  localStorage.setItem('tasbih-date', todayDate);
  ['daily', 'salat', 'prophetic', 'parents'].forEach(type => {
    localStorage.setItem(`tasbih-count-${type}`, '0');     // عدد التسبيحات الكلي
    localStorage.setItem(`tasbih-counter-${type}`, '0');   // عدد الحبات المنجزة في السبحة
  });
}

window.onload = function () { let selectedColor = 'pink';
let selectedDhikr = [];
let currentDhikrType = '';
let counter = 0;
let maxBeads = 99;
let vibrateOn = true;
let todayCount = 0;
let tasbihMode = false;
let justStarted = false; // ✅ هنا نضيفه
function handleTasbihClick() {

  if (!tasbihMode) return;

  if (justStarted) {

    justStarted = false;

    return;

  }

  if (counter < maxBeads) {

    counter++;

    todayCount++;

    if (vibrateOn && navigator.vibrate) navigator.vibrate(50);

    updateUI();

  }

  if (counter >= maxBeads) {

    startBtn.style.display = "none";

    resetBtn.style.display = "inline-block";

    tasbihMode = false;

  }
document.removeEventListener("click", handleTasbihClick);

document.addEventListener("click", handleTasbihClick);
}
                             
const dailyDhikr = ["سبحان الله", "الحمد لله", "لا إله إلا الله", "والله أكبر"];

const parentsDhikr = [
  "رَبِّ ٱرْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
  "اللهم ارزقني بر والديّ أحياءً وأمواتًا، ولا تجعلني عاقًا شقيًا.",
  "اللهم اجعل والدَيّ من السعداء في الدنيا والآخرة، ورضهم عني رضا لا سخط بعده.",
  "اللهم اجعل قبورهم روضة من رياض الجنة، ولا تجعلها حفرة من حفر النار.",
  "اللهم اغفر لوالديّ وارفع درجتهما في المهديين، واجعل لهما نورًا وسرورًا.",
  "اللهم اجعلني سببًا في سعادتهم في الدنيا والآخرة، ولا تريني فيهم بأسًا يُبكيني.",
  "اللهم اجزِ والديّ عني خير الجزاء، وبارك في أعمارهم وأعمالهم.",
  "اللهم ارزق والديّ الصحة والعافية، وأطل في أعمارهما على طاعتك وارحم من سبقنا إليك.",
  
  // أدعية جديدة:
  "اللهم اجعل والديّ من أوليائك الصالحين، وأكرمهم بكرمك يوم الدين.",
  "اللهم ارزق والديّ نورًا في قبريهما، وسعةً في مدخلهما، ومغفرة لا تنقطع.",
  "اللهم أكرم والديّ كما أكرموني صغارًا، وبارك لهما كما باركا لي عمرًا.",
  "اللهم إني أسألك أن ترزق والديّ لذة النظر إلى وجهك الكريم، ومجاورة نبيك في جنات النعيم.",
  "اللهم لا تجعل في قلبَيْ والديّ هما إلا فرجته، ولا دينًا إلا قضيته، ولا حاجةً من حوائج الدنيا والآخرة إلا قضيت وارحم من سبقنا منهم إليك .",
  "اللهم اجعل أوقاتهما عامرة بذكرك، وقلوبهما مطمئنة بذكرك، وأعمالهما خالصة لوجه وارحم من سبقنا منهم إليك.",
  "اللهم اجمعني بهما في الفردوس الأعلى، ولا تحرمني بر رؤيتهما في كل حين.",
  "اللهم اجعل صدقاتي عن والديّ نورًا لهما في الدنيا والآخرة، وبلّغهم أجرها كاملًا يا كريم.",
  "اللهم ارزق والديّ سعادةً لا تزول، وصحةً لا تحول، وراحةً لا تنقطع.",
  "اللهم اجعل دعائي لهما رحمةً تصعد، ونورًا ينزل، وسرورًا يدوم."
];
const propheticDuahs = [ "اللهم آتِ نفسي تقواها، وزكّها أنت خير من زكّاها، أنت وليها ومولاها." , "اللهم إني أسألك العفو و العافية في الدنيا والآخرة.", "اللهم إني أعوذ بك من الهم والحزن، والعجز والكسل، والجبن والبخل، وغلبة الدين وقهر الرجال.", "اللهم أصلح لي ديني الذي هو عصمة أمري، وأصلح لي دنياي التي فيها معاشي واصلح لي آخرتي التي فيها ميعادي.", "اللهم اغفر لي خطيئتي، وجهلي، وإسرافي في أمري، وما أنت أعلم به مني.", "اللهم إني أعوذ بك من جَهد البلاء، ودرك الشقاء، وسوء القضاء، وشماتة الأعداء.", "ربّ اغفر لي وتب عليّ إنك أنت التواب الرحيم.", "اللهم إني أعوذ بك من زوال نعمتك، وتحوّل عافيتك، وفُجاءة نِقمتك، وجميع سخطك.", "اللهم حبّب إليّ الإيمان وزينه في قلبي، وكرّه إليّ الكفر والفسوق والعصيان.", "اللهم اجعل خير عمري آخره، وخير عملي خواتمه، وخير أيامي يوم ألقاك.", "اللهم إني أسألك الهدى والتقى والعفاف والغنى.", "اللهم ثبتني على دينك ما أحييتني، ولا تزغ قلبي بعد إذ هديتني.", "اللهم اجعلني لك شاكرًا، لك ذاكرًا، لك مِطواعًا، لك أواهًا منيبًا.", "ياغني ياحميد يامبدئ يامعيد يارحيم ياودود أغنني بحلالك عن حرامك وبفضلك عمن سواك.", "ياحي ياقيوم برحمتك أستغيث أصلح لي شأني كله ولا تكلني إلى نفسي طرفة عين.", "ربي لاتذرني فردًا وأنت خير الوارثين.", "اللهم فاطر السموات والأرض عالم الغيب والشهادة أنت تحكم بين عبادك في ماكانوا فيه يختلفون.", "اللهم اشرح لي صدري ويسر لي أمري واحلل عقدة من لساني يفقه قولي.", "اللهم لاسهل إلا ماجعلته سهلا وإنك تجعل الحزن إذا شئت سهلا.", "اللهم أنت ربي لا إله إلا أنت خلقتني وأنا عبدك... فاغفر لي إنه لايغفر الذنوب إلا أنت.", "لا إله إلا الله عدد ماكان، لا إله إلا الله عدد مايكون، لا إله إلا الله عدد الحركات والسكون.", "أستغفر الله العظيم وأتوب إليه.", "لا إله إلا الله له الملك وله الحمد وهو على كل شيء قدير.", "ربي إني لما أنزلت إلي من خير فقير.", "لا إله إلا أنت سبحانك إني كنت من الظالمين.", "اللهم إنك عفو تحب العفو فاعفُ عنا.", "اللهم آتنا في الدنيا حسنة، وفي الآخرة حسنة، وقنا عذاب النار.", "لا إله إلا الله العظيم الحليم، رب العرش العظيم، رب السماوات والأرض.", "اللهم إن كان رزقي في السماء فأنزله، وإن كان في الأرض فأخرجه وإن كان بعيدًا فقربه وإن كان قليلًا فكثره وإن كان كثيرًا فبارك لي فيه.", "اللهم اكفني بحلالك عن حرامك، وأغنني بفضلك عمن سواك.", "اللهم افتح لي أبواب رزقك، وارزقني من حيث لا أحتسب.", "اللهم إني أسألك من الخير كله عاجله وآجله، ما علمت منه وما لم أعلم، وأعوذ بك من الشر كله، وأسألك الجنة وأعوذ بك من النار.", "اللهم ارزقني رزقًا واسعًا حلالًا طيبًا من غير كدّ، واستجب دعائي." ];

const selectionScreen = document.getElementById("selectionScreen"); const dhikrScreen = document.getElementById("dhikrSelectionScreen"); const tasbihScreen = document.getElementById("tasbihScreen"); const circleContainer = document.getElementById("circle-container"); const counterDisplay = document.getElementById("counter"); const dhikrDisplay = document.getElementById("dhikr"); const dailyReport = document.getElementById("dailyReport"); const vibrateToggle = document.getElementById("vibrateToggle"); const resetBtn = document.getElementById("resetBtn"); const startBtn = document.getElementById("startBtn"); startBtn.addEventListener("click", (e) => {
  e.stopPropagation(); // ✅ لمنع احتساب هذه النقرة كتسبيحة
  tasbihMode = true;
  alert("✨ انقر في أي مكان على الشاشة للتسبيح!");
  startBtn.style.display = "none";
});
                                          
const backToBeads = document.getElementById("backToBeads"); const backToDhikr = document.getElementById("backToDhikr");

document.querySelectorAll(".bead-choice").forEach(btn => { btn.addEventListener("click", () => { selectedColor = btn.dataset.color; selectionScreen.style.display = "none"; dhikrScreen.style.display = "block"; }); });

document.querySelectorAll(".dhikr-choice").forEach(btn => {
  btn.addEventListener("click", () => {
    currentDhikrType = btn.dataset.dhikr;

    // 👇 تحميل القيم حسب النوع
    todayCount = parseInt(localStorage.getItem(`tasbih-count-${currentDhikrType}`) || '0');
    counter = parseInt(localStorage.getItem(`tasbih-counter-${currentDhikrType}`) || '0');
document.getElementById("fixed-buttons").style.display = "flex";
    // 👇 تعيين الذكر الصحيح
    switch (currentDhikrType) {
      case "daily":
        selectedDhikr = [...dailyDhikr];
        break;
      case "salat":
        selectedDhikr = [
  "اللهم صل وسلم على نبينا محمد.",
  "اللهم صل وسلم وبارك على سيدنا محمد وعلى آله وصحبه أجمعين.",
  "اللهم صل على محمد عدد ما ذكره الذاكرون، وصلِّ عليه عدد ما غفل عن ذكره الغافلون.",
  "اللهم صل على محمد وعلى آل محمد كما صليت على إبراهيم وعلى آل إبراهيم، إنك حميد مجيد.",
  "اللهم بارك على محمد وعلى آل محمد كما باركت على إبراهيم وعلى آل إبراهيم، إنك حميد مجيد.",
  "اللهم صل على محمد وعلى آل محمد صلاة ترضيك وترضيه وترضى بها عنا يا أرحم الراحمين.",
  "اللهم صل صلاة كاملة وسلم سلامًا تامًا على نبيٍ تنحل به العقد، وتنفرج به الكرب، وتُقضى به الحوائج.",
  "اللهم صل على سيدنا محمد عدد خلقك، ورضا نفسك، وزنة عرشك، ومداد كلماتك.",
  "اللهم صل على سيدنا محمد في الأولين، وصل عليه في الآخرين، وصل عليه في الملأ الأعلى إلى يوم الدين.",
  "اللهم اجعل صلاتنا على النبي نورًا لنا في الدنيا والآخرة، وشفيعًا لنا يوم القيامة.",
  "اللهم ارزقنا شفاعة نبيك محمد، واسقنا من يده الشريفة شربة لا نظمأ بعدها أبدًا.",
  "اللهم صل وسلم على خير خلقك، محمد، عبدك ورسولك النبي الأمي، وعلى آله وصحبه أجمعين."
];
        break;
      case "prophetic":
        selectedDhikr = [...propheticDuahs];
        break;
      case "parents":
        selectedDhikr = [...parentsDhikr];
        break;
    }

    dhikrScreen.style.display = "none";
    tasbihScreen.style.display = "block";
    drawBeads();
    updateUI();
  });
});

function drawBeads() {
  circleContainer.innerHTML = "";
  const radius = 120, centerX = 130, centerY = 130;

  for (let i = 0; i < maxBeads; i++) {
    const angle = (2 * Math.PI * i) / maxBeads;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    const bead = document.createElement("div");
    bead.className = "bead";
    bead.style.left = `${x}px`;
    bead.style.top = `${y}px`;
    bead.style.position = "absolute";
    bead.style.width = "10px";
    bead.style.height = "10px";
    bead.style.borderRadius = "50%";
    bead.style.backgroundColor = selectedColor;
    bead.style.transform = "translate(-50%, -50%)";

    circleContainer.appendChild(bead);
  }
}

function updateUI() {
  counterDisplay.textContent = `${counter} / ${maxBeads}`;
  dhikrDisplay.textContent = selectedDhikr[counter % selectedDhikr.length];
  document.querySelectorAll(".bead").forEach((b, i) => {
    b.classList.toggle("active", i < counter);
  });

  // 👇 نحفظ العداد الخاص بالنوع المحدد
  localStorage.setItem(`tasbih-count-${currentDhikrType}`, todayCount.toString());
  localStorage.setItem(`tasbih-counter-${currentDhikrType}`, counter.toString());

  dailyReport.textContent = `🌿 لقد سبّحتِ اليوم: ${todayCount} مرة`;
}

function handleClick() {
  if (!tasbihMode) return;

  if (justStarted) {
    justStarted = false;
    return;
  }

  if (counter < maxBeads) {
    counter++;
    todayCount++;
    if (vibrateOn && navigator.vibrate) navigator.vibrate(50);
    updateUI();
  }

  if (counter >= maxBeads) {
    startBtn.style.display = "none";
    resetBtn.style.display = "inline-block";
    tasbihMode = false;
  }
}

// 🧠 نربطه مرة واحدة فقط
document.removeEventListener("click", handleClick);
document.addEventListener("click", handleClick);

vibrateToggle.addEventListener("click", () => {
  vibrateOn = !vibrateOn;
  vibrateToggle.textContent = `الاهتزاز: ${vibrateOn ? "✅ مفعل" : "❌ مغلق"}`;
  vibrateToggle.classList.toggle("off", !vibrateOn);
});
                             resetBtn.addEventListener("click", () => {
  counter = 0;
  justStarted = false;

  updateUI();

  tasbihMode = true;
  startBtn.style.display = "inline-block";
  resetBtn.style.display = "none";

  // 👇 نحفظ فقط عداد الحبات بالصفر، ونترك todayCount كما هو
  localStorage.setItem(`tasbih-counter-${currentDhikrType}`, '0');
});

backToBeads?.addEventListener("click", () => { dhikrScreen.style.display = "none"; selectionScreen.style.display = "block"; });

backToDhikr?.addEventListener("click", () => { tasbihScreen.style.display = "none"; dhikrScreen.style.display = "block"; resetBtn.style.display = "none"; startBtn.style.display = "inline-block"; });

requestNotificationPermission(); setInterval(sendReminderNotification, 1800000); };

function requestNotificationPermission() { if ("Notification" in window && Notification.permission !== "granted") { Notification.requestPermission(); } }

function sendReminderNotification() { if (Notification.permission === "granted") { new Notification("🌸 تذكير تسبيح", { body: "استغفري الله واذكريه دائمًا، فذكركِ نجاة 🌿", icon: "icon512.png" }); } }