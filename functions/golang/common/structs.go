package common

import (
)

//object_ceshi对象的元数据
type aaa struct {
	Text          string      `json:"text"`
	Number        int         `json:"number"`
	File          interface{} `json:"attachment"`
	RichText      interface{} `json:"richText"`
	Date          interface{} `json:"date"`
	Datetime      interface{} `json:"datetime"`
	Phone         interface{} `json:"phone"`
	Email         interface{} `json:"email"`
	Option_danzhi interface{} `json:"option_danzhi"`
	Boolean       interface{} `json:"boolean"`
	Avatar        interface{} `json:"avatar"`
	Multilingual  interface{} `json:"multilingual"`
	Formula       interface{} `json:"formula"`
	Lookup        interface{} `json:"lookup"`
	SubObject     interface{} `json:"subObject"`
	Option_duozhi interface{} `json:"option_duozhi,omitempty"`
}
type TestObject struct {
	Text          string      `json:"text"`
}