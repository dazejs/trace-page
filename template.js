import './template/less/index.less'
import $ from 'zepto'
import PR from 'code-prettify'

$(function () {
  PR.prettyPrint()

  $('.frame').on('click', function (e) {
    var index = $(this).data('index')
    $('.frame.active').removeClass('active')
    $(this).addClass('active')
    $('.frame-code.active').removeClass('active')
    $('.frame-code' + '-' + index).addClass('active')
  })

  $('.frame-code').each(function (e) {
    var ele = $(this)
    var li = ele.find('.prettyprint').find('li')
    var currentLineNumber = ele.data('current')
    var firstLineNumber = li.first().attr('value')
    var activeLineNumber = currentLineNumber - firstLineNumber - 1
    li.eq(activeLineNumber).addClass('active', 'current')
    li.eq(activeLineNumber - 1).addClass('current')
    li.eq(activeLineNumber + 1).addClass('current')
  })
})
