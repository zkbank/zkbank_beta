function modal_show(id)
{
  /* Maybe there will be something interesting if modal's gonna be more complicated */
  $('.overlay').fadeIn();
}
function modal_close(id)
{
  /* Maybe there will be something interesting if modal's gonna be more complicated */
  $('.overlay').fadeOut();
}


$('*[data-modal-open]').click(function(){
  modal_show($(this).attr('data-modal-open'));
});

$('*[data-modal-close]').click(function(){
  modal_close($(this).attr('data-modal-close'));
});

// Tabs

function tab_show(obj, id, group)
{
  obj.parent().find('a').removeClass('selected');
  obj.addClass('selected');
  $('ul[data-tab-group=' + group + '] > li').hide();
  $('ul[data-tab-group=' + group + '] > li[data-tab=' + id + ']').show();
}

$('ul[data-tab-group] > li:first-child').show();
$('a[data-tab-open-group][data-tab-open]').click(function(){
  tab_show($(this), $(this).attr('data-tab-open'), $(this).attr('data-tab-open-group'));
});
