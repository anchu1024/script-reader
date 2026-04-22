# define

ここではデータの仕様や今後のスクリプトの方針などを定義することで、相互互換を保ちやすくし、バグを減らすことを目的としています。

## 保存用データ型

```
{
    "assets": {
        "images": {
            "chara1": "data:image/png;base64,Ahx3AjifxHJwqQ....",
            "chara2": "data:image/png;base64,JIsnjffcx122y8ayYjfrjsW27cxX....",
            ...
        },
        "audio": {
            "bgm1": "data:audio/mp3;base64,Ijejz1993+udiw4/jizxjieQxizdf...",
            ...
        }
    },
    "script": "...ここに台本文字列(ユーザーからの生入力)が入る。その定義は後ほど"
}
```