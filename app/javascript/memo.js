const buildHTML = (XHR) => {
  const item = XHR.response.post;
    //新しく作成されたデータ（レコード）
  const html = `
    <div class="post">
      <div class="post-date">
        投稿日時：${item.created_at}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div>`;
  return html;
};

function post (){
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    e.preventDefault();
    //これ書かないと、javascriptからと、ブラウザからの2つのリクエストが→ブラウザからのリクエストを無効化
    //↑form_with→createメソッドの流れのこと？
    const form = document.getElementById("form");
    const formData = new FormData(form);
    //取得した要素(form)に入力された値を取得
    const XHR = new XMLHttpRequest();
    //XMLHttpRequestオブジェクト(リクエストを送信するのに必要)を生成
    XHR.open("POST", "/posts", true);
    //リクエストの内容を指定・・・open("HTTPメソッド", "パス", true) rails routesでposts#createのところみる？
    XHR.responseType = "json";
    //レスポンスの形式(データフォーマット)を指定
    XHR.send(formData);
    //データ送信
    XHR.onload = () => {
    //リクエスト送信が成功すると呼び出される
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      };
      const list = document.getElementById("list");
      const formText = document.getElementById("content");
      list.insertAdjacentHTML("afterend", buildHTML(XHR));
      //データ挿入
      formText.value = "";
      //フォーム入力欄を空に（ページ更新されないと一度記入したもの残ったままになってる）
    };
  });
};

window.addEventListener('load', post);
//windowをloadしたら関数postを実行！