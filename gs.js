function submit(){
  let ss = SpreadsheetApp.getActiveSheet();
  let lastRow = ss.getLastRow();
  console.log(lastRow);
  // var value = ss.getRange(2, 1).getValue();
  // console.log(value)


  for(let i =2;i<=lastRow;i++){
    let name = ss.getRange(i, 1).getValue();
    console.log(name);

    openUrlwindowFeatures("https://8avnwixla0.execute-api.eu-central-1.amazonaws.com/default/certificate?name="+name);

    //  openUrlwindowFeatures("https://8avnwixla0.execute-api.eu-central-1.amazonaws.com/default/certificate?name=deneme");

  }


  // showAnchor(value,'http://stackoverflow.com/questions/tagged/google-apps-script');
}


function openUrlwindowFeatures(url){

  var tmp = HtmlService.createTemplateFromFile("index");
  tmp.url = url;
  tmp.isUrl = /^(http|www)/.test(url);
  tmp.windowFeatures = '_parent';
  var htmlOutput = tmp.evaluate();
  SpreadsheetApp.getUi().showModelessDialog(htmlOutput, " ");
}

function openUrl(url){

  var tmp = HtmlService.createTemplateFromFile("index");
  tmp.url = url;
  tmp.isUrl = /^(http|www)/.test(url);
  tmp.windowFeatures = undefined;
  var htmlOutput = tmp.evaluate();
  SpreadsheetApp.getUi().showModelessDialog(htmlOutput, " ");
}

function openUrl( url ){
  var html = HtmlService.createHtmlOutput('<html><script>'
  +'window.close = function(){window.setTimeout(function(){google.script.host.close()},9)};'
  +'var a = document.createElement("a"); a.href="'+url+'"; a.target="_blank";'
  +'if(document.createEvent){'
  +'  var event=document.createEvent("MouseEvents");'
  +'  if(navigator.userAgent.toLowerCase().indexOf("firefox")>-1){window.document.body.append(a)}'
  +'  event.initEvent("click",true,true); a.dispatchEvent(event);'
  +'}else{ a.click() }'
  +'close();'
  +'</script>'
  // Offer URL as clickable link in case above code fails.
  +'<body style="word-break:break-word;font-family:sans-serif;">Failed to open automatically. <a href="'+url+'" target="_blank" onclick="window.close()">Click here to proceed</a>.</body>'
  +'<script>google.script.host.setHeight(40);google.script.host.setWidth(410)</script>'
  +'</html>')
  .setWidth( 90 ).setHeight( 1 );
  SpreadsheetApp.getUi().showModalDialog( html, "Opening ..." );
}

function showAnchor(name,url) {
  var html = '<html><body><a href="'+url+'" target="blank" onclick="google.script.host.close()">'+name+'</a></body></html>';
  var ui = HtmlService.createHtmlOutput(html)
  SpreadsheetApp.getUi().showModelessDialog(ui,"demo");