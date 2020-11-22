
if(new_guide == 1) {
	tooltip.openDelay = 400;
}
var current_ability_level = 1;
var ability_level_order = new Array();
var ability_quick_enter_order = new Array();
var mod_stats_abilities = new Object();
var mod_stats_items = new Object();
var search_time_out;

function updateStats() {
	var current_stat_level;
	var stat_type;
	var total_stats = new Object();
	//Apply Level stats
	if(typeof level_stats != 'undefined') {
		for (i in level_stats[current_hero_level]) {
			if (level_stats[current_hero_level].hasOwnProperty(i)) {
				total_stats[i] = level_stats[current_hero_level][i];
			}
		}
		//console.log('Level '+current_hero_level+' Stats: '+level_stats[current_hero_level].toSource());
	}
	
	//Apply Items
	if(typeof mod_stats_items != 'undefined') {
		//console.log('Items Stats: '+mod_stats_items.toSource());
		for (var i in mod_stats_items) {
			if (mod_stats_items.hasOwnProperty(i)) {
				//rename our starts
				//Check for special cases
				if(i == 'bonus_all_stats') {
					if($('.'+i).length) {
						$('.'+i).each(function(index) {
							stat_type = $(this).attr('id');
							total_stats[stat_type] = (total_stats[stat_type]) ? total_stats[stat_type]+mod_stats_items[i] : mod_stats_items[i];
							//$(this).html(total_stats[stat_type]);
						});
					}
				} else if(i == 'bonus_stats') {
					total_stats['bonus_strength'] = (total_stats['bonus_strength']) ? total_stats['bonus_strength']+mod_stats_items[i] : mod_stats_items[i];
					total_stats['bonus_agility'] = (total_stats['bonus_agility']) ? total_stats['bonus_agility']+mod_stats_items[i] : mod_stats_items[i];
					total_stats['bonus_intelligence'] = (total_stats['bonus_intelligence']) ? total_stats['bonus_intelligence']+mod_stats_items[i] : mod_stats_items[i];
				} else if(i == 'health_regen' || i == 'bonus_health_regen' || i == 'aura_health_regen' || i == 'hp_regen') {
					var bonus = mod_stats_items[i];
					total_stats['bonus_regen'] = (total_stats['bonus_regen']) ? round(total_stats['bonus_regen']+bonus, 2) : round(bonus, 2);
				} else if(i == 'bonus_magical_armor' || i == 'bonus_spell_resist' || i == 'magic_resistance') {
					total_stats['bonus_magical_armor2'] = (mod_stats_items[i]-100);
				} else if(i == 'bonus_damage_prc' || i == 'damage_aura' || i == 'bonus_damage_percent') {
					if(typeof total_stats['bonus_damage_percent'] != 'undefined') {
						total_stats['bonus_damage_percent'].push(mod_stats_items[i]);
					} else {
						total_stats['bonus_damage_percent'] = new Array();
						total_stats['bonus_damage_percent'].push(mod_stats_items[i]);
					}
					//console.log('bonus_damage_prc: '+prc_of_attri+', '+total_stats['bonus_damage']);
				} else if(i == 'health_regen_rate') {
					var v_name = 'max_health_hp_regen';
					if(typeof total_stats[v_name] != 'undefined') {
						total_stats[v_name].push(mod_stats_items[i]);
					} else {
						total_stats[v_name] = new Array();
						total_stats[v_name].push(mod_stats_items[i]);
					}
					//total_stats['bonus_damage_percent'] = {num:mod_stats_abilities[i]};
				} else if(i.indexOf('_prc') !== -1) {
					var prc_of_attri = i.replace('_prc', '');
					var bonus = parseFloat(total_stats[prc_of_attri])*(parseFloat(mod_stats_items[i])/100);
					total_stats[prc_of_attri] = (total_stats[prc_of_attri]) ? total_stats[prc_of_attri]+bonus : bonus;
					//console.log('Stat Prc: '+prc_of_attri+', '+total_stats[prc_of_attri]);
				//} else if($('#'+i).length) {
				} else if(i == 'bonus_aura_movement_speed_pct' || i == 'bonus_movespeed_pct' || i == 'movement_speed_percent_bonus') {
					//total_stats['movement_speed_percent_bonus'] = (total_stats['movement_speed_percent_bonus']) ? total_stats['movement_speed_percent_bonus']+mod_stats_items[i] : mod_stats_items[i];
					if(typeof total_stats['bonus_movespeed_percent'] != 'undefined') {
						total_stats['bonus_movespeed_percent'].push(mod_stats_items[i]);
					} else {
						total_stats['bonus_movespeed_percent'] = new Array();
						total_stats['bonus_movespeed_percent'].push(mod_stats_items[i]);
					}
				} else if(i == 'bonus_aura_attack_speed_pct' || i == 'aura_attack_speed') {
					total_stats['bonus_speed'] = (total_stats['bonus_speed']) ? total_stats['bonus_speed']+mod_stats_items[i] : mod_stats_items[i];
				} else if(i == 'armor_aura' || i == 'aura_bonus_armor' || i == 'aura_positive_armor') {
					total_stats['bonus_armor'] = (total_stats['bonus_armor']) ? total_stats['bonus_armor']+mod_stats_items[i] : mod_stats_items[i];
				} else if(i == 'mana_regen' || i == 'bonus_mana_regen_pct') {
					total_stats['bonus_mana_regen'] = (total_stats['bonus_mana_regen']) ? total_stats['bonus_mana_regen']+mod_stats_items[i] : mod_stats_items[i];
				} else {
					//current_stat_level = (typeof level_stats[current_hero_level] != 'undefined' && level_stats[current_hero_level][i]) ? level_stats[current_hero_level][i] : 0;
					//console.log(total_stats[i]+' '+mod_stats_items[i]);
					total_stats[i] = (total_stats[i]) ? total_stats[i]+mod_stats_items[i] : mod_stats_items[i];
					//$('#'+i).html(total_stats[i]);
				}
			}
		}
	}

	//if(typeof new_guide != 'undefined' && new_guide == 0 && typeof new_guide != 'edit_guide' && edit_guide == 0) {
	if(typeof ability_level_order_edit != 'undefined' && edit_guide == 0) {
		var ability_id;
		var invested_levels = new Object();
		mod_stats_abilities =  new Object();
		var block;

		for(var c=0; c<=current_hero_level; c++) {
			var v = c-1;
			if(ability_level_order_edit[c]) {
				//$('#'+ability_level_order_edit[c]).find('.ability_level_block').css('color', '#C2C2C2');
				$('#'+ability_level_order_edit[c]).find('.ability_level_block').removeClass('view_guide_ability_highlight');
			}
			if(ability_level_order_edit[v]) {
				ability_id = ability_level_order_edit[v];
				if(typeof invested_levels[ability_id] == 'undefined') {
					invested_levels[ability_id] = 1;
				} else {
					invested_levels[ability_id] += 1;
				}

				//invested_levels[ability_id] = (invested_levels[ability_id] == 0) ? invested_levels[ability_id]+1 : invested_levels[ability_id];
				//$('#'+ability_id).find('.ability_level_block').css('color', '#C2C2C2');
				$('#'+ability_id).find('.ability_level_block').removeClass('view_guide_ability_highlight');
				if(invested_levels[ability_id]) {
					block = $('#'+ability_id).find('.ability_level_block:eq('+(current_hero_level-1)+')');
					//$('#'+ability_id).find('.ability_level_block:eq('+(current_hero_level)+')').css('color', '#C2C2C2');
					//$('#'+ability_id).find('.ability_level_block:eq('+(current_hero_level-1)+')').css('color', '#C2C2C2');
					if(typeof block.children('img').attr('src') != 'undefined' && block.children('img').attr('src').indexOf('level_bullet_filled') != -1) {
						//block.css('color', '#FAAF40');
						block.addClass('view_guide_ability_highlight');
					}
				}
				var inves_lvl = invested_levels[ability_id];
				inves_lvl--;
				if(typeof ability_json[ability_id] != 'undefined') {
					for(var i in ability_json[ability_id]['stats']) {
						if(ability_json[ability_id]['stats'].hasOwnProperty(i)) {
							stat_vals_level = ability_json[ability_id]['stats'][i].split(' ');
							if(i.indexOf('_per_level') !== -1) {
								mod_stats_abilities[i.replace('_per_level', '')] = stat_vals_level[0] * (inves_lvl);
							} else {
								//mod_stats_abilities[i] = (stat_vals_level[(invested_levels[ability_id])]) ? parseFloat(stat_vals_level[(invested_levels[ability_id])]) : 0;
								mod_stats_abilities[i] = (stat_vals_level[inves_lvl]) ? parseFloat(stat_vals_level[inves_lvl]) : 0;
								mod_stats_abilities[i] = (stat_vals_level[0] && stat_vals_level.length == 1 && inves_lvl >= 1) ? parseFloat(stat_vals_level[0]) : mod_stats_abilities[i];
							}
							if(ability_json[ability_id]['is_active'] == 0) {
								if(i.indexOf('_per_level') !== -1) {
									mod_stats_abilities[i.replace('_per_level', '')] = 0;
								} else {
									mod_stats_abilities[i] = 0;
								}
							}
							//console.log(current_hero_level+' '+ability_id+': '+invested_levels[ability_id]);
						}
					}
				}
			}
		}
		for(var i in ability_json) {
			if(ability_json.hasOwnProperty(i)) {
				if(invested_levels[i] >= 1) {
					$('#'+i).find('.ability_medium_icon_tt').attr('rel', '/lvl/'+invested_levels[i]);
				}
			}
		}
		/*
		if(typeof ability_json[ability_id]['stats'] != 'undefined') {
			var stat_vals_level;
			for(var i in ability_json[ability_id]['stats']) {
				if(ability_json[ability_id]['stats'].hasOwnProperty(i)) {
					stat_vals_level = ability_json[ability_id]['stats'][i].split(' ');
					console.log(stat_vals_level);
					//mod_stats_abilities[i] = (parseFloat(mod_stats_abilities[i])) ? parseFloat(mod_stats_abilities[i]) + parseFloat(stat_vals_level[(invested_levels+1)]) : parseFloat(stat_vals_level[(invested_levels+1)]);
					
					//This effect is per level so we ignore the normal level of it call and use the invested level
					if(i.indexOf('_per_level')) {
						mod_stats_abilities[i.replace('_per_level', '')] = stat_vals_level[0] * (invested_levels+1);
					} else {
						mod_stats_abilities[i] = (stat_vals_level[(invested_levels+1)]) ? parseFloat(stat_vals_level[(invested_levels+1)]) : 0;
					}
				}
			}
		}
		*/
	}
	
	//Apply abilities
	//console.log(current_hero_level);
	//console.log(mod_stats_abilities);
	if(typeof mod_stats_abilities != 'undefined') {
		//console.log('Mod Stats: '+mod_stats_abilities.toSource());
		for (var i in mod_stats_abilities) {
			if (mod_stats_abilities.hasOwnProperty(i)) {
				//Check for special cases
				if(i == 'bonus_all_stats') {
					if($('.'+i).length) {
						$('.'+i).each(function(index) {
							stat_type = $(this).attr('id');
							total_stats[stat_type] = (total_stats[stat_type]) ? total_stats[stat_type]+mod_stats_abilities[i] : mod_stats_abilities[i];
							//$(this).html(total_stats[stat_type]);
						});
					}
				} else if(i == 'max_health_hp_regen') {
					var v_name = 'max_health_hp_regen';
					if(typeof total_stats[v_name] != 'undefined') {
						total_stats[v_name].push(mod_stats_abilities[i]);
					} else {
						total_stats[v_name] = new Array();
						total_stats[v_name].push(mod_stats_abilities[i]);
					}
					//total_stats['bonus_damage_percent'] = {num:mod_stats_abilities[i]};
				} else if(i == 'bonus_damage_percent') {
					/*
					var prc_of_attri = 'damage';
					var bonus = parseFloat(total_stats[prc_of_attri])*(parseFloat(mod_stats_abilities[i])/100);
					total_stats['bonus_damage'] = (total_stats['bonus_damage']) ? round(total_stats['bonus_damage']+bonus, 2) : round(bonus, 2);
					*/
					//var num = parseInt(i.replace('bonus_damage_percent', ''));
					if(typeof total_stats['bonus_damage_percent'] != 'undefined') {
						total_stats['bonus_damage_percent'].push(mod_stats_abilities[i]);
					} else {
						total_stats['bonus_damage_percent'] = new Array();
						total_stats['bonus_damage_percent'].push(mod_stats_abilities[i]);
					}
					//total_stats['bonus_damage_percent'] = {num:mod_stats_abilities[i]};
				} else if(i == 'bonus_movespeed_pcr' || i == 'bonus_movespeed_percent') {
					//var prc_of_attri = 'bonus_movement';
					//var bonus = parseFloat(total_stats[prc_of_attri])*(parseFloat(mod_stats_abilities[i])/100);
					//total_stats['bonus_movement'] = (total_stats['bonus_movement']) ? round(total_stats['bonus_movement']+bonus, 2) : round(bonus, 2);
					if(typeof total_stats['bonus_movespeed_percent'] != 'undefined') {
						total_stats['bonus_movespeed_percent'].push(mod_stats_abilities[i]);
					} else {
						total_stats['bonus_movespeed_percent'] = new Array();
						total_stats['bonus_movespeed_percent'].push(mod_stats_abilities[i]);
					}
				} else if(i == 'bonus_attack_speed_prc') {
					//alert('asasd');
					var prc_of_attri = 'base_attack_speed';
					var bonus = 100*(parseFloat(mod_stats_abilities[i])/100);
					total_stats['base_attack_speed'] = (total_stats['base_attack_speed']) ? round(total_stats['base_attack_speed']+bonus, 2) : round(bonus, 2);
					//console.log('bonus_damage_prc: '+prc_of_attri+', '+total_stats['bonus_damage']);
				} else if(i == 'base_attack_rate') {
					//alert('asasd');
					total_stats[i] = (mod_stats_abilities[i]) ? mod_stats_abilities[i] : total_stats[i];
					//console.log('bonus_damage_prc: '+prc_of_attri+', '+total_stats['bonus_damage']);
				} else if(i.indexOf('_prc') !== -1) {
					var prc_of_attri = i.replace('_prc', '');
					var bonus = parseFloat(total_stats[prc_of_attri])*(parseFloat(mod_stats_abilities[i])/100);
					total_stats[prc_of_attri] = (total_stats[prc_of_attri]) ? total_stats[prc_of_attri]+bonus : bonus;
					//console.log('Stat Prc: '+prc_of_attri+', '+total_stats[prc_of_attri]);
				//} else if($('#'+i).length) {
				} else {
					//current_stat_level = (typeof level_stats[current_hero_level] != 'undefined' && level_stats[current_hero_level][i]) ? level_stats[current_hero_level][i] : 0;
					//console.log(total_stats[i]+' '+mod_stats_abilities[i]);
					total_stats[i] = (total_stats[i]) ? total_stats[i]+mod_stats_abilities[i] : mod_stats_abilities[i];
					//$('#'+i).html(total_stats[i]);
				}
			}
		}
	}
	
	//We need to recalculate values now
	var pattri = ($('#primary_attribute').length) ? $('#primary_attribute').html().toLowerCase() : 'strength';
	
	//total_stats['bonus_health'] = parseFloat(total_stats['base_health'])+total_stats['bonus_health']+round(19*parseFloat(total_stats['bonus_strength']));
	total_stats['bonus_health'] = total_stats['bonus_health']+round(19*total_stats['bonus_strength']);
	//total_stats['bonus_health_regen'] = round(parseFloat(total_stats['base_health_regen'])+total_stats['bonus_health_regen']+round(0.03*parseFloat(total_stats['bonus_strength']), 2), 2);
	total_stats['bonus_health_regen'] = round(round(total_stats['base_health_regen']+round(0.03*(total_stats['base_strength']+total_stats['bonus_strength']), 2), 2)+total_stats['bonus_regen'], 2);
	if(typeof total_stats['max_health_hp_regen'] != 'undefined') {
		for (var i in total_stats['max_health_hp_regen']) {
			if (total_stats['max_health_hp_regen'].hasOwnProperty(i)) {
				total_stats['bonus_health_regen'] += round(total_stats['bonus_health']*(parseFloat(total_stats['max_health_hp_regen'])/100), 2);
			}
		}
	}
	total_stats['bonus_health_regen'] = round(total_stats['bonus_health_regen'], 2);
	//total_stats['bonus_mana'] = parseFloat(total_stats['base_mana'])+total_stats['bonus_mana']+round(13*parseFloat(total_stats['bonus_intelligence']));
	total_stats['bonus_mana'] = total_stats['bonus_mana']+round(13*total_stats['bonus_intelligence']);
	//total_stats['bonus_mana_regen'] = round(parseFloat(total_stats['base_mana_regen'])+total_stats['bonus_mana_regen']+round(0.04*parseFloat(total_stats['bonus_intelligence']), 2), 2);
	//total_stats['bonus_mana_regen'] = round(total_stats['bonus_mana_regen']+round(0.04*total_stats['bonus_intelligence'], 2), 2);
	
	total_stats['base_mana_regen'] = round(total_stats['base_mana_regen']+round(0.04*(total_stats['bonus_intelligence']+total_stats['bonus_intellect']+total_stats['bonus_int']), 2), 2);
	//This mana regen gets the bonus_mana_regen stat which is actually % based
	total_stats['bonus_mana_regen'] = (total_stats['bonus_mana_regen'] > 0) ? total_stats['base_mana_regen']+(total_stats['base_mana_regen'] * (total_stats['bonus_mana_regen']/100)) : total_stats['base_mana_regen'];
	//total_stats['bonus_mana_regen'] = round(total_stats['base_mana_regen']+round(0.04*(total_stats['base_intelligence']+total_stats['bonus_intelligence']), 2), 2)+total_stats['bonus_mana_regen'];
	
	//We just tag on aura regen because it isn't affected by +% items
	if(total_stats['aura_mana_regen']) {
		total_stats['bonus_mana_regen'] += total_stats['aura_mana_regen'];
	}
	if(total_stats['mana_regen_aura']) {
		total_stats['bonus_mana_regen'] += total_stats['mana_regen_aura'];
	}
	total_stats['bonus_mana_regen'] = round(total_stats['bonus_mana_regen'], 2);
	
	total_stats['bonus_armor'] = round(parseFloat(total_stats['base_armor']) + (total_stats['bonus_agility']/7) + total_stats['bonus_armor'], 2);
	
	total_stats['bonus_speed'] = total_stats['base_attack_speed']+total_stats['bonus_agility']+total_stats['bonus_speed']+total_stats['bonus_attack_speed'];
	total_stats['attack_rate'] = round(total_stats['base_attack_rate']/parseFloat(total_stats['bonus_speed']/100), 2);
	
	total_stats['bonus_strength'] = total_stats['base_strength']+total_stats['bonus_strength'];
	total_stats['bonus_agility'] = total_stats['base_agility']+total_stats['bonus_agility'];
	total_stats['bonus_intelligence'] = total_stats['base_intelligence']+total_stats['bonus_intelligence']+total_stats['bonus_intellect']+total_stats['bonus_int'];
	
	//total_stats['bonus_armor'] = round(parseFloat(total_stats['base_armor']) + Math.ceil(total_stats['bonus_agility']/7), 2)+total_stats['bonus_armor'];
	//total_stats['bonus_armor'] = total_stats['base_armor']+;
	total_stats['bonus_armor_reduction'] = Math.floor(((0.06 * total_stats['bonus_armor']) / (1 + 0.06 * total_stats['bonus_armor'] )*100));
	
	if(total_stats['bonus_magical_armor2'] && total_stats['bonus_magical_armor3']) {
		total_stats['bonus_spell_resist'] = (1 - (1 - (total_stats['bonus_magical_armor1']/100)) * (1 - (total_stats['bonus_magical_armor2']/100)) * (1 - (total_stats['bonus_magical_armor3']/100))) * 100;
	} else if(total_stats['bonus_magical_armor2']) {
		total_stats['bonus_spell_resist'] = (1 - (1 - (total_stats['bonus_magical_armor1']/100)) * (1 - (total_stats['bonus_magical_armor2']/100))) * 100;
	} else if(total_stats['bonus_magical_armor3']) {
		total_stats['bonus_spell_resist'] = (1 - (1 - (total_stats['bonus_magical_armor1']/100)) * (1 - (total_stats['bonus_magical_armor3']/100))) * 100;
	} else {
		total_stats['bonus_spell_resist'] = (1 - (1 - (total_stats['bonus_magical_armor1']/100))) * 100;
	}
	total_stats['bonus_spell_resist'] = round(total_stats['bonus_spell_resist'], 2);
	
	//total_stats['bonus_armor_reduction'] = round((1 - ( 1/ (1 + (total_stats['bonus_armor'] * 0.06))))*100, 2);
	//total_stats['bonus_armor_reduction'] = round(((0.06*total_stats['bonus_armor'])/(1 + 0.06*total_stats['bonus_armor']))*100, 2);
	
	total_stats['bonus_attack_range'] = total_stats['base_attack_range']+total_stats['bonus_attack_range'];
	
	total_stats['damage_min'] = round(parseFloat(total_stats['base_damage_min']) + parseFloat(total_stats['bonus_'+pattri]), 1);
	total_stats['damage_max'] = round(parseFloat(total_stats['base_damage_max']) + parseFloat(total_stats['bonus_'+pattri]), 1);
	total_stats['damage'] = Math.floor((total_stats['damage_min']+total_stats['damage_max'])/2);
	
	//loop over all damage percent bonuses and add them to bonus damage
	if(typeof total_stats['bonus_damage_percent'] != 'undefined') {
		for (var i in total_stats['bonus_damage_percent']) {
			if (total_stats['bonus_damage_percent'].hasOwnProperty(i)) {
				var bonus = parseFloat(total_stats['damage'])*(parseFloat(total_stats['bonus_damage_percent'][i])/100);
				total_stats['bonus_damage'] = (total_stats['bonus_damage']) ? round(total_stats['bonus_damage']+bonus, 2) : round(bonus, 2);
			}
		}
	}
	total_stats['damage'] = '<span class="help_q_mark" title="Total: '+(total_stats['damage']+total_stats['bonus_damage'])+'">'+total_stats['damage']+'</span>';
	
	//var base_movement = total_stats['base_movement']+total_stats['bonus_movement']+total_stats['bonus_movement_speed'];
	total_stats['bonus_movement'] = total_stats['base_movement']+total_stats['bonus_movement']+total_stats['bonus_movement_speed'];
	//total_stats['bonus_movement'] = round(base_movement+((base_movement) * (total_stats['movement_speed_percent_bonus']/100))+((base_movement) * (total_stats['bonus_movespeed_pct']/100))+((base_movement) * (total_stats['bonus_movespeed_pct1']/100)), 2);
	var move_speed_prc_bonus = 0;
	if(typeof total_stats['bonus_movespeed_percent'] != 'undefined') {
		for (var i in total_stats['bonus_movespeed_percent']) {
			if (total_stats['bonus_movespeed_percent'].hasOwnProperty(i)) {
				var bonus = parseFloat(total_stats['bonus_movement'])*(parseFloat(total_stats['bonus_movespeed_percent'][i])/100);
				move_speed_prc_bonus = move_speed_prc_bonus+bonus;
			}
		}
	}
	total_stats['bonus_movement'] += move_speed_prc_bonus;
	total_stats['bonus_movement'] = (total_stats['bonus_movement_minus']) ? total_stats['bonus_movement']-total_stats['bonus_movement_minus'] : total_stats['bonus_movement'];
	
	total_stats['bonus_ehp'] = round(total_stats['bonus_health'] + (total_stats['bonus_health'] * 0.06 * total_stats['bonus_armor']), 2);
	
	total_stats['sight_radius_night'] = total_stats['bonus_night_vision'] + total_stats['sight_radius_night'];
	
	//Now update tooltip with all our new stats
	for (i in total_stats) {
		if (total_stats.hasOwnProperty(i)) {
			if($('#'+i).length) {
				$('#'+i).html(total_stats[i]);
			}
		}
	}
	
	//console.log(total_stats);
}

function getItemGroups() {
	var item_group_data = new Object();
	var i = 0;
	$('.item_group_wrapper').each(function(index) {
		var group_name = $(this).find('#item_group_name').val()+'_gid_'+i;
		if($(this).children('.item_group_item, .item_group_item item_selected').length && $(this).children('.item_group_item, .item_group_item item_selected').first().html()) {
			item_group_data[group_name] = new Array();
			$(this).children().each(function(index) {
				if($(this).attr('class') != 'item_group_controls') {
					if($(this).hasClass('item_group_item')) {
						item_group_data[group_name].push($(this).attr('id'));
					}
					if($(this).attr('id') == 'next_or') {
						var and_or = ($(this).children('span').attr('title') == 'Then') ? ':' : '|';
						item_group_data[group_name].push(and_or);
					}
				}
			});
		}
		i++;
	});
	
	//console.log(item_group_data);
	return item_group_data;
}

function saveGuide(auto_save) {
	var error = '';
	var hero_id = (typeof edit_selected_hero != 'undefined' && edit_selected_hero) ? edit_selected_hero : $.cookie('selected_hero_id');
	//hero_id = (auto_save == 1) ? $.cookie('selected_hero_id') : hero_id;
	var guide_name = $('#guide_name').val();
	var guide_text = $('#hero_guide_text').val();
	var guide_tags = new Array();
	$('input[name="guide_tags"]').each(function(index) {
		if($(this).is(":checked")) {
			guide_tags.push($(this).val());
		}
	});
	
	var ability_level_data = ability_level_order;
	var item_build_data = getItemGroups();
	
	//Error checking
	if(jQuery.isEmptyObject(ability_level_data) && jQuery.isEmptyObject(item_build_data) && !guide_text && !auto_save) {
		error = 'You must fill in eithier an ability level order, item build or guide field.';
	}
	
	if(!guide_name && !auto_save) {
		error = 'You must fill in a guide name.';
	}
	
	if(ability_level_data && ability_level_data.length >= 1 && ability_level_data.length < 25 && !auto_save) {
		error = 'You must use all 25 ability points if you are making a guide with abilities.';
	}
	
	//console.log(ability_level_data);
	//console.log(item_build_data);
	//console.log(guide_text);
	
	if(error) {
		customPopUp(error);
		
		return false;
	}
	
	
	//No errors found! Send our data to make sure
	var request = $.ajax({
		url: site_root+'/dota-2/guide/submit/tt',
		type: "POST",
		timeout: "10000",
		//dataType: "json",
		data: {
			hero_id: hero_id,
			guide_name: guide_name,
			guide_text: guide_text,
			guide_tags: guide_tags,
			ability_level_data: ability_level_data,
			item_build_data: item_build_data,
			guide_edit_id: guide_edit_id,
			auto_save: auto_save
		},
		success: function(data) {
			//if submit success then clear cookies
			data = jQuery.parseJSON(data);
			if(data['status'] == 'success' && !auto_save) {
				clearSavedData();
				window.location.replace(data['location']);
			} else if(!auto_save) {
				customPopUp(data['message']);
			}
		},
		timeout: function(data) {
			customPopUp('Request timed out, server may be overloaded. Please try again in a few minutes.');
		}
	});
	
	request.fail(function(jqXHR, textStatus) {
		customPopUp("Request failed: " + textStatus );
	});
}

function autoSaveGuide() {
	saveGuide(1);
	
	//Create the clear saved guide data button
	if(!$('#delete_guide').length) {
		$('#preview_guide').after(' <a id="delete_guide" href="'+site_root+'/dota-2/guide/action/delete" class="small_buttons"><img src="'+site_root+'/images/icons/cross-button.png" /><span>Delete Temporary Guide</span></a>')
	}
}

function clearSavedData() {
	$.cookie('selected_hero_id', '', {path: '/'});
	$.cookie('ability_level_order', '');
}

function customPopUp(message) {
	var ok = $('<button />', { 
		text: 'Ok',
		style: 'margin: 0 auto; float: none;'
	})
	
	$('<div />').qtip({
		content: {
			//text: message.add(input).add(ok).add(cancel),
			text: $('<p />').prepend(message).add(ok),
			title: 'Error'
		},
		position: {
			my: 'center', at: 'center', // Center it...
			target: $(window) // ... in the window
		},
		show: {
			ready: true, // Show it straight away
			modal: {
				on: true, // Make it modal (darken the rest of the page)...
				blur: false // ... but don't close the tooltip when clicked
			}
		},
		hide: false, // We'll hide it maunally so disable hide events
		style: 'ui-tooltip-light ui-tooltip-rounded ui-tooltip-dialogue', // Add a few styles
		events: {
			// Hide the tooltip when any buttons in the dialogue are clicked
			render: function(event, api) {
				$('button', api.elements.content).click(api.hide);
			},
			// Destroy the tooltip once it's hidden as we no longer need it!
			hide: function(event, api) { api.destroy(); }
		}
	});
}
	
$(document).ready(function () {
	function resetSettings() {
		current_ability_level = 1;
		ability_level_order = new Array();
		ability_quick_enter_order = new Array();
		mod_stats_abilities = new Object();
		total_stats = new Object();
		//level_stats = new Object();
		//current_hero_level = 1;
	}
	
	//Hero change/select controls
	$(document).on('click', '#no_hero', function(ev) {
		ev.preventDefault();
		resetSettings();
		level_stats = new Object();
		$('.hero_list_wrapper').slideToggle('fast');
		
		edit_selected_hero = 0;
		$.cookie('selected_hero_id', '0', {path: '/'});
		$.cookie('ability_level_order', '');
		
		$('.hero_tooltip_wrapper, .hero_abilities_wrapper').html('');
		//$('#selected_hero').html('(No Hero - <a id="change_hero" href="#">Change</a>)');
		$('#select_hero_header').html('Step 1 - Select a Hero (None - <a id="change_hero" href="#">Change</a>)');
		$('#hero_skill_order_head').html('Step 2 - Ability Order (Skipped - <a id="change_hero" href="#">Change</a>)');
		$('#hero_item_builds_header').html('Step 3 - Item Builds (or <a id="no_item_builds" href="#">No Item Builds</a>)');
	});
	
	$(document).on('click', '#change_hero', function(ev) {
		ev.preventDefault();
		resetSettings();
		level_stats = new Object();
		$('.hero_list_wrapper').slideToggle('fast');
		
		$('.hero_tooltip_wrapper, .hero_abilities_wrapper').html('');
		//$('#selected_hero').html('(or <a id="no_hero">No Hero</a>)');
		$('#select_hero_header').html('Step 1 - Select a Hero (or <a id="no_hero" href="#">No Hero</a>)');
		$('#hero_skill_order_head').html('Step 2 - Ability Order');
	});
	
	$(document).on('click', '#no_item_builds', function(ev) {
		ev.preventDefault();
		$('.hero_items_wrapper').slideToggle('fast');

		//$('#selected_hero').html('(or <a id="no_hero">No Hero</a>)');
		$('.item_groups_container').html('');
		$('#hero_item_builds_header').html('Step 3 - Item Builds (None - <a id="item_builds_change" href="#">Change</a>)');
	});
	
	$(document).on('click', '#item_builds_change', function(ev) {
		ev.preventDefault();
		$('.hero_items_wrapper').slideToggle('fast');
		
		$('#hero_item_builds_header').html('Step 3 - Item Builds (or <a id="no_item_builds" href="#">No Item Builds</a>)');
	});
	
	
	//Item builder stuff
	
	$(document).on('keyup', '#item_list_text_filter', function(ev) {
		//ev.preventDefault();
		search_time_out = setTimeout(function() {
			buildItemList();
			//console.log($(this).val());
		}, 300);
	});
	
	$(document).on('keydown', '#item_list_text_filter', function(ev) {
		//ev.preventDefault();
		if(search_time_out) clearTimeout(search_time_out); 
	});
	
	$(document).on('focus', '#item_list_text_filter', function(ev) {
		ev.preventDefault();
		if($(this).val() == 'Search...') {
			$(this).val('');
		}
	});
	
	$(document).on('change', '#item_list_hide_recipes', function(ev) {
		buildItemList();
	});
	
	$(document).on('click', '.item_list_expand_button', function(ev) {
		ev.preventDefault();
		$('.item_list_wrapper').css('height', 'auto');
		$('.item_list_container').css('height', 'auto');
		$.fn.jScroll.recalcPos($(".hero_guide_quick_insert"));
	});
	
	function buildItemFilters() {
		var filters_html = '';
		
		filters_html += '<div class="item_list_filters">';
		filters_html += '<input type="text" id="item_list_text_filter" value="Search..." />';
		filters_html += '<div style="float: right;">Hide Recipes: <input type="checkbox" id="item_list_hide_recipes" value="1" checked="CHECKED" /></div>';
		filters_html += '</div>';
		
		$(".item_list_container").prepend(filters_html);
	}
	
	function buildItemList() {
		if(typeof items != 'undefined') {
			//console.log('build list');
			var item_list_html = '';
			var quality_list = {1:[],2:[],3:[],4:[],5:[],6:[]};
			var quality_names = {1:'Component',2:'Common',3:'Rare',4:'Epic',5:'Artifact',6:'Secret'};
			var item_list_style;
			//search_text = '';
			search_text = $('#item_list_text_filter').val();
			var hide_recipes = $('#item_list_hide_recipes:checked').val();
			//search_text = (search_text == 'Search...') ? search_text.replace('Search...') : '';
			var regex = new RegExp(search_text, 'gi');
			
			item_list_style = 'icons';

			for(var i in items) {
				if(items.hasOwnProperty(i)) {
					if(search_text !== 'Search...' && items[i][0][0].match(regex) == null) {
						continue;
					}
					if (hide_recipes !== undefined && items[i][0][0].indexOf('Recipe: ') === 0) {
						continue;
					}
					
					//quality_list.push({items[i][0][3]:})
					if(item_list_style == 'icons') {
						quality_list[items[i][0][3]].push('<div style="float: none; margin: 0 auto; width: 50px;" class="item_icon_block" id="'+items[i][0][2]+'"><a rel="" class="item_icon_tt_mouse_track" href="'+site_root+'/dota-2/item/i/'+items[i][0][2]+'/'+items[i][0][5]+'"><img class="item_icon" src="'+site_root+'/images/item_icons/medium/'+items[i][0][1]+'.png"></a></div>');
					} else {
						quality_list[items[i][0][3]].push('<div style="float: none; margin: 0 auto; width: 50px;" class="item_icon_block" id="'+items[i][0][2]+'"><a rel="" class="item_icon_tt_mouse_track" href="'+site_root+'/dota-2/item/i/'+items[i][0][2]+'/'+items[i][0][5]+'"><img class="item_icon" src="'+site_root+'/images/item_icons/medium/'+items[i][0][1]+'.png"></a></div>');
					}
					//item_list_html += items[i][0][0]+'<br />';
				}
			}
			
			//console.log(quality_list);
			
			for(var i in quality_list) {
				if(quality_list.hasOwnProperty(i)) {
					if(quality_list[i].length) {
						item_list_html += '<ul class="item_list_group"><li><span class="q'+i+'">'+quality_names[i]+'</span></li><li>'+quality_list[i].join('</li><li>')+'</li></ul>';
					}
				}
			}
			
			$('.item_list_wrapper').html(item_list_html);
			$(".item_list_container").append('<div class="item_list_expand_button"></div>');
			$(".item_list_container").resizable({
				alsoResize: ".item_list_wrapper, .item_list_container",
				handles: "se",
				minHeight: 100,
				minWidth: 815,
				resize: function(event, ui) {
					$.fn.jScroll.recalcPos($(".hero_guide_quick_insert"));
				}
			});
			
			tooltip.find_links();
		}
	}
	
	$(document).on('click', '#select_group', function(ev) {
		ev.preventDefault();
		$(this).parent().parent().parent().children('.item_group_wrapper').removeClass('item_group_selected');
		$(this).parent().parent().addClass('item_group_selected');
	});
	
	$(document).on('click', '.item_icon_tt_mouse_track', function(ev) {
		ev.preventDefault();
		var item_html = '';
		
		var new_icon = $($(this).parent().parent().html());
		new_icon.children("a").attr('class', 'item_group_item_in_group');
		
		item_html += '<div class="item_group_item" id="'+new_icon.attr('id')+'">';
		item_html += new_icon.html();
		item_html += '<a id="delete_item" href="#">Delete</a>'
		item_html += '</div>'
		
		if($('.item_groups_container').children(".item_group_selected").length) {
			var group_item = $('.item_groups_container').children(".item_group_selected").last().children(".item_group_item");
		} else {
			var group_item = $('.item_groups_container').children().last().children(".item_group_item");
		}
		
		if(group_item.length >= 50) {
			alert('To help prevent spam you are limited to 50 items per group.');
			return false;
		}
		
		group_item.last().after(item_html);
		
		//remove the first empty item
		if(!group_item.first().html()) {
			group_item.first().remove();
		}
		
		//group_item = $('.item_groups_container').children().last().children(".item_group_item");
		if($('.item_groups_container').children(".item_group_selected").length) {
			group_item = $('.item_groups_container').children(".item_group_selected").last().children(".item_group_item");
		} else {
			group_item = $('.item_groups_container').children().last().children(".item_group_item");
		}
		if(group_item.length >= 2) {
			//group_item.last().before('<a id="next_or" href="#" class="small_buttons" style="float: left; margin-right: 11px; margin-top: 5px;"><img alt="Then" title="Then" src="http://127.0.0.1/dotaholic/images/icons/next_arrow.png" style="padding: 5px 0px 0 0;"><span style="padding: 0px;">&or;</span></a>');
			
			group_item.last().before('<a id="next_or" href="#" class="small_buttons" style="float: left; margin-right: 11px; margin-top: 5px;"><span title="Then" style="padding: 0px 6px 0 0; font-size: 18px; line-height: 22px;">&raquo;</span></a>');
			//group_item.last().before('<a id="next_or" href="#" class="small_buttons" style="float: left; margin-right: 11px; margin-top: 5px;"><img title="Or" style="padding: 5px 0px 0 0;"><span style="padding: 0px 7px 0 0;">Or</span></a>');
		}
		
		updateQuickInsertItems();
	});
	
	$(document).on('click', '#next_or', function(ev) {
		ev.preventDefault();
		var img_info = $(this).find('span').attr('title');
		
		if(img_info == 'Then') {
			//$(this).attr('style', 'float: left; margin-right: 11px; margin-top: 5px;');
			$(this).html('<span title="Or" style="padding: 0px 7px 0 0;">Or</span>')
		} else if(img_info == 'Or') {
			//$(this).attr('style', 'float: left; margin-right: 11px; margin-top: 5px;');
			$(this).html('<span title="Then" style="padding: 0px 6px 0 0; font-size: 18px; line-height: 22px;">&raquo;</span>')
		}
	});
	
	$(document).on('click', '#delete_item', function(ev) {
		ev.preventDefault();
		
		//Check if we are deleteing the first item ina group so we can remove the correct and/or
		if($(this).parent().prev().attr('class') == 'item_group_controls') {
			$(this).parent().next("#next_or").remove();
		}
		
		$(this).parent().prev("#next_or").remove();
		
		if($(this).parent().parent().children(".item_group_item").length <= 1) {
			$(this).parent().removeAttr('id');
			$(this).parent().removeClass('item_selected');
			$(this).parent().html('');
		} else {
			$(this).parent().remove();
		}
		
		
		updateItems();
		updateQuickInsertItems();
		//mod_stats_items[i]
	});

	$(document).on('click', '.item_group_item_in_group', function(ev) {
		ev.preventDefault();
		
		$(this).parent().toggleClass('item_selected');
		
		updateItems();
		//mod_stats_items[i]
	});
	
	$(document).on('click', '#add_item_group', function(ev) {
		ev.preventDefault();
		createItemGroup();
	});
	
	function updateItems() {
		mod_stats_items = new Object();
		
		$('.item_groups_container').find('.item_group_item').each(function(index) {
			if($(this).hasClass('item_selected')) {
				var item_id = parseInt($(this).attr('id'));
				if(item_stats[item_id]) {
					for(var i in item_stats[item_id]) {
						if(item_stats[item_id].hasOwnProperty(i)) {
							var stat_value = item_stats[item_id][i];
							mod_stats_items[i] = (mod_stats_items[i]) ? mod_stats_items[i]+stat_value : stat_value;
						}
					}
				}
				//console.log(mod_stats_items);
			}
		});
		
		updateStats();
	}
	
	function updateQuickInsertItems() {
		$('.hero_guide_quick_insert_items').html('');
		
		$('.item_groups_container').find('.item_group_item').each(function(index) {
			var item_id = $(this).attr('id');
			if(typeof item_id != 'undefined' && !$('.hero_guide_quick_insert_items').children('#'+item_id).length) {
				var quick_insert_item = $(this).children('.item_group_item_in_group').clone();
				
				quick_insert_item.children('img').css('height', '27px').css('width', '54px');
				quick_insert_item.attr('class', 'quick_insert_item');
				
				quick_insert_item = $('<div class="item_icon_block item_icon_block_quick quick_insert" id="'+item_id+'"></div>').append(quick_insert_item);
				//quick_insert_item.add('<div  class="item_icon_block" style="float: left; margin: 0 auto; width: 25px; height: 18px;" />').html(quick_insert_item);
				//$('.hero_guide_quick_insert_items').append('<div class="item_icon_block" style="float: left; margin: 0 auto; width: 25px; height: 18px;">'+quick_insert_item+'</div>');
				$('.hero_guide_quick_insert_items').append(quick_insert_item);
			}
			//$(this).html(total_stats[stat_type]);
		});
		
		/*
		//Table Version
		var num_item_per_row = 4;
		var current_items_in_row = 0;
		var current_num_rows = 0;
		$('.item_groups_container').find('.item_group_item').each(function(index) {
			var item_id = $(this).attr('id');
			if(typeof item_id != 'undefined' && !$('.hero_guide_quick_insert_items').children('#'+item_id).length) {
				var quick_insert_item = $(this).children('.item_group_item_in_group').clone();
				
				quick_insert_item.children('img').css('height', '27px').css('width', '54px');
				quick_insert_item.attr('class', 'quick_insert_item');
				
				quick_insert_item = $('<div class="item_icon_block item_icon_block_quick quick_insert" id="'+item_id+'" style="float: none;"></div>').append(quick_insert_item);
				//quick_insert_item.add('<div  class="item_icon_block" style="float: left; margin: 0 auto; width: 25px; height: 18px;" />').html(quick_insert_item);
				//$('.hero_guide_quick_insert_items').append('<div class="item_icon_block" style="float: left; margin: 0 auto; width: 25px; height: 18px;">'+quick_insert_item+'</div>');
				if(current_items_in_row == num_item_per_row) {
					$('.hero_guide_quick_insert_items table tbody').append('<tr></tr>');
					$('.hero_guide_quick_insert_items table tbody tr').append('<td></td>');
					$('.hero_guide_quick_insert_items table tbody tr:eq('+current_num_rows+') td:eq('+current_items_in_row+')').append(quick_insert_item);
					current_items_in_row = 0;
					current_num_rows++;
				} else {
					$('.hero_guide_quick_insert_items table tbody tr:eq('+current_num_rows+')').append('<td></td>');
					$('.hero_guide_quick_insert_items table tbody tr:eq('+current_num_rows+') td:eq('+current_items_in_row+')').append(quick_insert_item);
					current_items_in_row++;
				}
			}
			//$(this).html(total_stats[stat_type]);
		});
		*/

		$.fn.jScroll.recalcPos($(".hero_guide_quick_insert"));
	}
	
	//Build groups
	function createItemGroup() {
		var item_group_html = '';
		var number_item_groups = $(".item_group_wrapper").length
		
		if(number_item_groups < 15) {
			number_item_groups++;
			item_group_html += '<div class="item_group_wrapper" id="item_group'+number_item_groups+'">';
			item_group_html += '<div class="item_group_controls"><input type="text" id="item_group_name" value="Item Build" maxlength="64" /> <a id="delete_group" href="#" class="small_buttons"><img src="'+site_root+'/images/icons/cross-button.png"><span>Delete Group</span></a> <a id="select_group" href="#" class="small_buttons"><img src="'+site_root+'/images/icons/check-button.png"><span>Select</span></a></div>';
			item_group_html += '<div class="item_group_item"></div><div class="clear_both"></div>';
			item_group_html += '</div>';
			
			$('.item_groups_container').append(item_group_html);
		} else {
			alert('To help prevent spamming you are limited to 15 item groups per guide.');
		}
		//getItemGroups();
	}
	
	//Ability picking stuff
	$(document).on('click', '#delete_group', function(ev) {
		ev.preventDefault();
		var group_obj = $(this).parent().parent();
		var group_id = group_obj.attr('id').replace('item_group');
		
		group_obj.remove();
		
		//update item stats array
		updateItems()

		//$('.hero_items_wrapper').html('');
	});
	
	//Ability picking stuff
	$(document).on('click', '#show_items', function(ev) {
		ev.preventDefault();
		$(this).remove();

		//$('.hero_items_wrapper').html('');
	});
	
	function buildAbilityStats(ability_id, invested_levels, add_or_remove) {
		invested_levels_change = (add_or_remove == -1) ? invested_levels-1 : invested_levels;
		invested_levels_add = (add_or_remove == -1) ? invested_levels : invested_levels+1;
		if(typeof ability_json[ability_id]['stats'] != 'undefined') {
			var stat_vals_level;
			for(var i in ability_json[ability_id]['stats']) {
				if(ability_json[ability_id]['stats'].hasOwnProperty(i)) {
					stat_vals_level = ability_json[ability_id]['stats'][i].split(' ');
					//console.log(stat_vals_level);
					//mod_stats_abilities[i] = (parseFloat(mod_stats_abilities[i])) ? parseFloat(mod_stats_abilities[i]) + parseFloat(stat_vals_level[(invested_levels+1)]) : parseFloat(stat_vals_level[(invested_levels+1)]);
					
					//This effect is per level so we ignore the normal level of it call and use the invested level
					if(i.indexOf('_per_level') !== -1) {
						//mod_stats_abilities[i.replace('_per_level', '')] = stat_vals_level[0] * (invested_levels-1);
						mod_stats_abilities[i.replace('_per_level', '')] = parseFloat(stat_vals_level[0]) * (invested_levels_add);
					} else {
						//mod_stats_abilities[i] = (stat_vals_level[invested_levels_change]) ? parseFloat(stat_vals_level[invested_levels_change]) : 0;
						mod_stats_abilities[i] = (stat_vals_level[invested_levels_change]) ? parseFloat(stat_vals_level[invested_levels_change]) : 0;
						mod_stats_abilities[i] = (stat_vals_level[0] && stat_vals_level.length == 1 && invested_levels_change >= 1) ? parseFloat(stat_vals_level[0]) : mod_stats_abilities[i];
						//console.log(stat_vals_level.length);
					}
					if(ability_json[ability_id]['is_active'] == 0) {
						if(i.indexOf('_per_level') !== -1) {
							mod_stats_abilities[i.replace('_per_level', '')] = 0;
						} else {
							mod_stats_abilities[i] = 0;
						}
					}
				}
			}
		}
	}
	
	$(document).on('click', '.ability_plus_button', function(ev) {
		ev.preventDefault();
		var level_container = $(this).parent().parent().children(".ability_levels_wrapper").children(".ability_level_block:nth-child("+current_ability_level+")");
		var ability_id = $(this).parent().parent().attr('id');
		
		//Get the numbere of level we have in this ability
		var invested_levels = 0; 
		$(this).parent().parent().children(".ability_levels_wrapper").children(".ability_level_block").each(function(index) {
			if($(this).hasClass('selected')) {
				invested_levels++;
			}
		});

		if($(level_container).length && typeof ability_json[ability_id] != 'undefined' && invested_levels < ability_json[ability_id]['maxlevel']) {
			level_container.addClass('selected');
			level_container.children("img").attr('src', site_root+'/images/icons/level_bullet_filled.png');
			
			//Build our ability stat mod array
			//console.log(ability_json[ability_id]);
			/*
			if(typeof ability_json[ability_id]['stats'] != 'undefined') {
				var stat_vals_level;
				for(var i in ability_json[ability_id]['stats']) {
					if(ability_json[ability_id]['stats'].hasOwnProperty(i)) {
						stat_vals_level = ability_json[ability_id]['stats'][i].split(' ');
						//console.log(stat_vals_level);
						//mod_stats_abilities[i] = (parseFloat(mod_stats_abilities[i])) ? parseFloat(mod_stats_abilities[i]) + parseFloat(stat_vals_level[(invested_levels+1)]) : parseFloat(stat_vals_level[(invested_levels+1)]);
						
						//This effect is per level so we ignore the normal level of it call and use the invested level
						if(i.indexOf('_per_level') !== -1) {
							mod_stats_abilities[i.replace('_per_level', '')] = stat_vals_level[0] * (invested_levels+1);
						} else {
							mod_stats_abilities[i] = (stat_vals_level[(invested_levels)]) ? parseFloat(stat_vals_level[(invested_levels)]) : 0;
						}
						if(!ability_json[ability_id]['is_active']) {
							if(i.indexOf('_per_level') !== -1) {
								mod_stats_abilities[i.replace('_per_level', '')] = 0;
							} else {
								mod_stats_abilities[i] = 0;
							}
						}
					}
				}
			}
			*/
			buildAbilityStats(ability_id, invested_levels, 1);
			
			//Generate level order
			ability_level_order.push(parseInt(ability_id));
			ability_quick_enter_order.push($(this).attr('id').replace('_plus', ''));
			
			$('#ability_quick_fill').val(ability_quick_enter_order.join(','));
			
			if(new_guide == 1) {
				$.cookie('ability_level_order', ability_quick_enter_order.join(','));
			}
			
			//Set rel vars on icon
			if(invested_levels >= 1) {
				$(this).parent().find('.ability_medium_icon_tt').attr('rel', '/lvl/'+(invested_levels+1));
			}
			//$('#ability'+ability_id).attr('rel', '/lvl/'+invested_levels);
			
			//tooltip.find_links();
			//.attr('src', site_root+'/images/icons/level_bullet_filled.png')
			updateStats();
			current_ability_level++;
			$("#level_slider").slider("value", ability_level_order.length);
			
			//Flash our next button
			//if(current_ability_level >= 25) {
				//$('#show_items').effect('shake', {}, 500);
			//}
		}
	});
	
	$(document).on('click', '.ability_minus_button', function(ev) {
		ev.preventDefault();
		var level_container = $(this).parent().parent().children(".ability_levels_wrapper").children(".ability_level_block:nth-child("+(current_ability_level-1)+")");
		var ability_id = $(this).parent().parent().attr('id');
		
		if(level_container.hasClass('selected')) {
			level_container.removeClass('selected');
			level_container.children("img").attr('src', site_root+'/images/icons/level_bullet_empty.png');
			
			//Get the numbere of level we have in this ability
			var invested_levels = 0; 
			$(this).parent().parent().children(".ability_levels_wrapper").children(".ability_level_block").each(function(index) {
				if($(this).hasClass('selected')) {
					invested_levels++;
				}
			});
			
			//console.log(invested_levels);
			
			//Generate level order
			ability_level_order.pop();
			ability_quick_enter_order.pop();
			
			$('#ability_quick_fill').val(ability_quick_enter_order.join(','));
			
			if(new_guide == 1) {
				$.cookie('ability_level_order', ability_quick_enter_order.join(','));
			}
			
			//Build our ability stat mod array
			/*
			if(typeof ability_json[ability_id]['stats'] != 'undefined') {
				var stat_vals_level;
				for(var i in ability_json[ability_id]['stats']) {
					if(ability_json[ability_id]['stats'].hasOwnProperty(i)) {
						stat_vals_level = ability_json[ability_id]['stats'][i].split(' ');
						//mod_stats_abilities[i] = (parseFloat(mod_stats_abilities[i])) ? parseFloat(mod_stats_abilities[i]) + parseFloat(stat_vals_level[(invested_levels+1)]) : parseFloat(stat_vals_level[(invested_levels+1)]);
						//This effect is per level so we ignore the normal level of it call and use the invested level
						if(i.indexOf('_per_level')) {
							mod_stats_abilities[i.replace('_per_level', '')] = stat_vals_level[0] * (invested_levels);
						} else {
							mod_stats_abilities[i] = (stat_vals_level[(invested_levels-1)]) ? parseFloat(stat_vals_level[(invested_levels-1)]) : 0;
						}
					}
				}
				
				//console.log(stat_vals_level);
			}
			*/
			/*
			if(typeof ability_json[ability_id]['stats'] != 'undefined') {
				var stat_vals_level;
				for(var i in ability_json[ability_id]['stats']) {
					if(ability_json[ability_id]['stats'].hasOwnProperty(i)) {
						stat_vals_level = ability_json[ability_id]['stats'][i].split(' ');
						//console.log(stat_vals_level);
						//mod_stats_abilities[i] = (parseFloat(mod_stats_abilities[i])) ? parseFloat(mod_stats_abilities[i]) + parseFloat(stat_vals_level[(invested_levels+1)]) : parseFloat(stat_vals_level[(invested_levels+1)]);
						
						//This effect is per level so we ignore the normal level of it call and use the invested level
						if(i.indexOf('_per_level') !== -1) {
							//mod_stats_abilities[i.replace('_per_level', '')] = stat_vals_level[0] * (invested_levels-1);
							mod_stats_abilities[i.replace('_per_level', '')] = stat_vals_level[0] * (invested_levels);
						} else {
							mod_stats_abilities[i] = (stat_vals_level[(invested_levels-1)]) ? parseFloat(stat_vals_level[(invested_levels-1)]) : 0;
						}
						if(!ability_json[ability_id]['is_active']) {
							if(i.indexOf('_per_level') !== -1) {
								mod_stats_abilities[i.replace('_per_level', '')] = 0;
							} else {
								mod_stats_abilities[i] = 0;
							}
						}
					}
				}
			}
			*/
			buildAbilityStats(ability_id, invested_levels, -1);
			
			//Set rel vars on icon
			if(invested_levels >= 1) {
				$(this).parent().find('.ability_medium_icon_tt').attr('rel', '/lvl/'+invested_levels);
			} else {
				$(this).parent().find('.ability_medium_icon_tt').attr('rel', '');
			}
			
			//.attr('src', site_root+'/images/icons/level_bullet_filled.png')
			updateStats();
			current_ability_level--;
			$("#level_slider").slider("value", ability_level_order.length);
		}
	});
	
	$(document).on('click', '#clear_abilities', function(ev) {
		ev.preventDefault();
		//ability_quick_enter_order = new Array();
		//ability_level_order = new Array();
		//current_ability_level = 1;
		resetSettings();
		
		$('.ability_level_block').children("img").attr('src', site_root+'/images/icons/level_bullet_empty.png');
		$('.ability_level_block').removeClass('selected');
		
		$('#ability_quick_fill').val(ability_quick_enter_order.join(','));
		
		updateStats();
	});
	
	$(document).on('keyup', '#ability_quick_fill', function(ev) {
		ev.preventDefault();
		//alert(ability_quick_enter_order.toSource());
		if(ev.which != 188) {
			var temp_order = $(this).val().split(',');
			//ability_quick_enter_order = new Array();
			
			$('#clear_abilities').trigger('click');
			
			for(var i in temp_order) {
				if(temp_order.hasOwnProperty(i)) {
					var hotkey = jQuery.trim(temp_order[i]);
					if(hotkey == 'Q' || hotkey == 'W' || hotkey == 'E' || hotkey == 'D' || hotkey == 'F' || hotkey == 'R' || hotkey == 'S' || hotkey == 'q' || hotkey == 'w' || hotkey == 'e' || hotkey == 'd' || hotkey == 'f' || hotkey == 'r' || hotkey == 's') {
						//ability_quick_enter_order.push(hotkey.toUpperCase());
						$('#'+hotkey.toUpperCase()+'_plus').trigger('click');
					}
				}
			}
			
			$('#ability_quick_fill').val(ability_quick_enter_order.join(','));
			
			if(edit_guide != 1) {
				$.cookie('ability_level_order', ability_quick_enter_order.join(','));
			}
		}
	});
	/*
	$(document).on('change', '#ability_quick_fill', function(ev) {
		ev.preventDefault();
		var temp_order = $(this).val().split(',');
		
		$('#clear_abilities').trigger('click');
		
		for(var i in temp_order) {
			if(temp_order.hasOwnProperty(i)) {
				var hotkey = jQuery.trim(temp_order[i]);
				if(hotkey == 'Q' || hotkey == 'W' || hotkey == 'E' || hotkey == 'D' || hotkey == 'F' || hotkey == 'R' || hotkey == 'S' || hotkey == 'q' || hotkey == 'w' || hotkey == 'e' || hotkey == 'd' || hotkey == 'f' || hotkey == 'r' || hotkey == 's') {
					//ability_quick_enter_order.push(hotkey);
					$('#'+hotkey.toUpperCase()+'_plus').trigger('click');
				}
			}
		}
		
		$('#ability_quick_fill').val(ability_quick_enter_order.join(','));
	});
	*/
	
	$(document).on('focus', '#ability_quick_fill', function(ev) {
		ev.preventDefault();
		if($(this).val() == 'Quick Enter') {
			$(this).val('');
		}
	});
	
	$(document).on('click', '#ability_activate_button', function(ev) {
		ev.preventDefault();
		var ability_id = $(this).attr('class');
		var html_val = $(this).html();
		var invested_levels = 0; 
		$(this).parent().next().children(".ability_levels_wrapper").children(".ability_level_block").each(function(index) {
			if($(this).hasClass('selected')) {
				invested_levels++;
			}
		});
		
		if(html_val == 'Activate') {
			ability_json[ability_id]['is_active'] = 1;
			$(this).html('Deactivate');
			if(invested_levels) {
				buildAbilityStats(ability_id, invested_levels-1, 1);
			}
			updateStats();
		} else {
			ability_json[ability_id]['is_active'] = 0;
			$(this).html('Activate');
			buildAbilityStats(ability_id, invested_levels, -1);
			updateStats();
		}
	});
	
	//Add the hero tooltip and stuff
	$(document).on('click', '.hero_select', function(ev) {
		ev.preventDefault();
		var link_url = $(this).attr('href');
		var hero_id = $(this).parent().attr('id').replace('hero_select_id_', '');
		current_ability_level = 1;
		mod_stats_abilities =  new Object();
		
		if(new_guide == 1) {
			$.cookie('selected_hero_id', hero_id, {path: '/'});
			edit_selected_hero = hero_id;
		} else {
			edit_selected_hero = hero_id;
		}

		//Hit hero selection
		$('.hero_list_wrapper').slideToggle('fast');
		
		$('.hero_tooltip').html('<div class="loading_box"><img src="'+site_root+'/images/layout/lightbox/loader.gif" style="vertical-align: middle; padding-right: 5px;"/>Loading...</div>');
		
		//Get our hero tooltip
		var request = $.ajax({
			url: link_url+'/ng/tt',
			type: "GET",
			success: function(data) {
				//$('.hero_tooltip').html('');
				$('#hero_skill_order_head').html('Step 2 - Ability Order');
				
				var tooltip_data = data.replace('dbtt_display_icon', 'dbtt_view_icon').replace('dbtt_wrapper', 'dbtt_view_wrapper').replace('\\', '');
				$('.hero_tooltip_wrapper').html(tooltip_data);
				
				//$('#selected_hero').html('('+$('.dbtt_name span:last').html()+' - <a id="change_hero" href="#">Change</a>)');
				$('#select_hero_header').html('Step 1 - Select a Hero ('+$('.dbtt_name span:last').html()+' - <a id="change_hero" href="#">Change</a>)');
				
				//Build ability level order stuff
				var ability_html = '';
				if(typeof ability_json != 'undefined') {
					//ability_html += '<h2 id="#hero_skill_order_head" style="margin-top: 0px;">Step 2 - Ability Order</h2>';
					var quick_insert_html = '<table style="border: collapse; width: 100%;"><tbody><tr>';
					for(var i in ability_json) {
						if(ability_json.hasOwnProperty(i)) {
							//We have no way to check if this is a levelable ability so we have to have hacks
							if(ability_json[i]['maxlevel'] > 1 && (ability_json[i]['hotkey'] || ability_json[i]['ability_id_name'] == '5002')) {
								ability_html += '<h3>'+ability_json[i]['ability_display_name']+((ability_json[i]['activatable']) ? ' - <a href="#" id="ability_activate_button" class="'+ability_json[i]['ability_id_name']+'">Activate</a>' : '')+'</h3>';
								
								ability_html += '<div class="ability_order_wrapper" id="'+ability_json[i]['ability_id_name']+'">';
								
								ability_html += '<div class="ability_block_wrapper"><a href="#" class="ability_minus_button" id="'+ability_json[i]['hotkey']+'_minus">&nbsp;</a><a href="#" class="ability_plus_button" id="'+ability_json[i]['hotkey']+'_plus">&nbsp;</a><div class="ability_medium_icon_block ability_block_guide"><a href="'+site_root+'/dota-2/ability/i/'+ability_json[i]['ability_id_name']+'/'+ability_json[i]['ability_url_name']+'" class="ability_medium_icon_tt" target="_blank">'+createNum(ability_json[i]['hotkey'], '', 'ability_icon_hotkey')+'<img src="'+site_root+'/images/ability_icons/medium/'+ability_json[i]['ability_icon']+'.png" class="ability_medium_icon" alt="'+ability_json[i]['ability_display_name']+'" /></a></div><div class="clear_both"></div></div>';
								
								ability_html += '<div class="ability_levels_wrapper">';
								for(var c = 1; c<=25; c++) {
									ability_html += '<div class="ability_level_block"><img src="'+site_root+'/images/icons/level_bullet_empty.png" /><br />'+c+'</div>';
								}
								ability_html += '</div>';
								
								ability_html += '</div><div class="clear_both"></div>';
								
								//Quick Insert - Abilities
								quick_insert_html += '<td><div id="'+ability_json[i]['ability_id_name']+'" class="ability_medium_icon_block quick_insert" style="float: none; margin: 3px auto 0px auto;"><a href="'+site_root+'/dota-2/ability/i/'+ability_json[i]['ability_id_name']+'/'+ability_json[i]['ability_url_name']+'" class="ability_medium_icon_tt">'+createNum(ability_json[i]['hotkey'], '', 'ability_icon_hotkey')+'<img src="'+site_root+'/images/ability_icons/medium/'+ability_json[i]['ability_icon']+'.png" class="ability_medium_icon" alt="'+ability_json[i]['ability_display_name']+'" /></a></div></td>';
								
								//ability_html += 'ssss';
							} else {
								//ability_html += '<div class="ability_order_wrapper">';
								
								//ability_html += '<div class="ability_block_wrapper"><div class="ability_medium_icon_block ability_block_guide"><a href="'+site_root+'/dota-2/ability/i/'+ability_json[i]['ability_id_name']+'/'+ability_json[i]['ability_url_name']+'" class="ability_medium_icon_tt" target="_blank">'+createNum(ability_json[i]['hotkey'], '', 'ability_icon_hotkey')+'<img src="'+site_root+'/images/ability_icons/medium/'+ability_json[i]['ability_icon']+'.png" class="ability_medium_icon" alt="'+ability_json[i]['ability_display_name']+'" /></a></div><div class="clear_both"></div></div>';
								
								//ability_html += '</div>';
							}
						}
					}
					quick_insert_html += '</tr></tbody></table><div class="clear_both"></div>';
					$('.hero_guide_quick_insert_abilities').html(quick_insert_html);
					
					ability_html += '<input type="text" size="55" id="ability_quick_fill" value="Quick Enter" /><div style="float: right"><a class="small_buttons" href="#" id="clear_abilities"><img src="'+site_root+'/images/icons/cross-button.png"><span>Clear</span></a></div>';
					//<a class="small_buttons" href="#" id="show_items"><img src="'+site_root+'/images/icons/next_arrow.png"><span>Next</span></a>
					
					$('.hero_abilities_wrapper').html(ability_html+'<div class="clear_both></div>');
					
					if(edit_guide == 1) {
						convertAbilityOrder();
						
						updateQuickInsertItems();
					}
				}
				
				tooltip.find_links();
				heroStatsSlider();
				updateStats();
				$('.help_q_mark').qtip({
					content: {
						text: function(api) {
							// Retrieve content from custom attribute of the $('.selector') elements.
							return $(this).attr('title');
						}
					},
					style: {
						classes: 'ui-tooltip-dark ui-tooltip-tipsy help_q_tip'
					},
					position: {
						my: 'bottom left',  // Position my top left...
						at: 'top left', // at the bottom right of...
						viewport: $(window)
					}
				});
			}
		});
		
	});
	
	function currentTime() {
		var now = new Date();
		var hours = now.getHours();
		var minutes = now.getMinutes();
		//var seconds = now.getSeconds()
		var timeValue = "" + ((hours >12) ? hours -12 :hours)
		if (timeValue == "0") timeValue = 12;
		timeValue += ((minutes < 10) ? ":0" : ":") + minutes
		//timeValue += ((seconds < 10) ? ":0" : ":") + seconds
		timeValue += (hours >= 12) ? " PM" : " AM"
		
		return timeValue;
	}
	
	
	//Guide Stuff
	function saveGuideText() {
		autoSaveGuide();
		
		if($('.hero_guide_savestatus').length) {
			$('.hero_guide_savestatus').html('Auto Saved ('+currentTime()+')');
		} else {
			$('.hero_guide_bbcode').append('<div class="hero_guide_savestatus">Auto Saved ('+currentTime()+')</div>');
		}
		/*
		var guide_text = $('.hero_guide_text').val();
		var d = new Date();
		
		$.cookie('guide_name', $('#guide_name').val());
		
		$.cookie('guide_text', guide_text);
		if($('.hero_guide_savestatus').length) {
			$('.hero_guide_savestatus').html('Auto Saved ('+currentTime()+')');
		} else {
			$('.hero_guide_bbcode').append('<div class="hero_guide_savestatus">Auto Saved ('+currentTime()+')</div>');
		}
		*/
		//console.log(guide_text);
	}
	
	//Check for cookies
	function getSavedData(is_edit) {
		if(is_edit == 1) {
			//alert(edit_selected_hero);
			$('#guide_name').val(edit_guide_name);
			//$('#hero_guide_text').val(edit_guide_text);
			$('#hero_guide_text').data('AutoResizer').check();
			
			if(edit_selected_hero > 0) {
				$('#hero_select_id_'+edit_selected_hero).children("a").first().trigger('click');
			} else {
				$('#no_hero').trigger('click');
			}
			
		}
		/*
		 else {
			//guide name
			if($.cookie('guide_name')) {
				$('#guide_name').val($.cookie('guide_name'));
			}
			
			//guide text
			if($.cookie('guide_text') && $('#hero_guide_text').length) {
				$('#hero_guide_text').val($.cookie('guide_text'));
				$('#hero_guide_text').data('AutoResizer').check();
			}
			
			//selected hero
			if($.cookie('selected_hero_id')) {
				$('#hero_select_id_'+$.cookie('selected_hero_id')).children("a").first().trigger('click');
			}
			
			//Set ability level order
			if($.cookie('ability_level_order')) {
				setTimeout(function(){ UpdateAbilityOrder(); }, 100);
				//$('#ability_quick_fill').val($.cookie('ability_level_order'));
				
				//console.log($.cookie('ability_level_order'));
			}
		}
		*/
	}
	
	function UpdateAbilityOrder() {
		if($('#ability_quick_fill').length) {
			$('#ability_quick_fill').val($.cookie('ability_level_order'));
			$('#ability_quick_fill').trigger('keyup');
		} else {
			setTimeout(function(){ UpdateAbilityOrder(); }, 100);
		}
	}
	
	var guide_text_timeout;
	$(document).on('keyup', '.hero_guide_text', function(ev) {
		//ev.preventDefault();
		if(auto_save_enabled) {
			clearTimeout(guide_text_timeout);
			guide_text_timeout = setTimeout(function() {
				saveGuideText();
			}, 15000);
		}
	});
	
	$(document).on('click', '#clear_guide', function(ev) {
		ev.preventDefault();
		$('.hero_guide_text').val('');
	});
	
	$(document).on('click', '#submit_guide', function(ev) {
		ev.preventDefault();
		
		saveGuide(0);
	});
	
	$(document).on('click', '#preview_guide', function(ev) {
		ev.preventDefault();
		$(this).replaceWith('<div id="preview_guide_loading" style="display: inline-block; margin-right: 5px;">Loading...</div>');
		var guide_text = $('#hero_guide_text').val();
		
		//No errors found! Send our data to make sure
		var request = $.ajax({
			url: site_root+'/dota-2/preview-guide/tt',
			type: "POST",
			timeout: "10000",
			//dataType: "json",
			data: {
				guide_text: guide_text,
			},
			success: function(data) {
				//if submit success then clear cookies
				data = jQuery.parseJSON(data);
				if(data['status'] == 'success') {
					//Output formatted guide text
					$('.guide_preview_wrapper').html(data['message']);
					
					if(data['bbcode_items']) {
						bbcode_items = jQuery.parseJSON(data['bbcode_items']);
					}
					
					if(data['bbcode_abilities']) {
						bbcode_abilities = jQuery.parseJSON(data['bbcode_abilities']);
					}
					
					if(data['bbcode_heroes']) {
						bbcode_heroes = jQuery.parseJSON(data['bbcode_heroes']);
					}
					
					if(data['bbcode_npcs']) {
						bbcode_npcs = jQuery.parseJSON(data['bbcode_npcs']);
					}

					if(data['bbcode_items'] || data['bbcode_abilities'] || data['bbcode_heroes'] || data['bbcode_npcs']) {
						var post_html = $('.guide_preview_wrapper').html();
						var bb_html = db_bb_parser(post_html, 0);				
						$('.guide_preview_wrapper').html(bb_html);
					}
					
					if(ajax_items.length >= 1 || ajax_abilities.length >= 1 || ajax_heroes.length >= 1 || ajax_npcs.length >= 1) {
						getBBCodeData(matched_items);
					}
					tooltip.find_links();
				} else {
					alert(data['message']);
				}
				$('#preview_guide_loading').replaceWith('<a id="preview_guide" href="'+site_root+'/dota-2/preview-guide" class="small_buttons"><img src="'+site_root+'/images/icons/eye.png" /><span>Preview Guide Text</span></a>');
			},
			timeout: function(data) {
				alert('Request timed out, server may be overloaded. Please try again in a few minutes.');
				$('#preview_guide_loading').replaceWith('<a id="preview_guide" href="'+site_root+'/dota-2/preview-guide" class="small_buttons"><img src="'+site_root+'/images/icons/eye.png" /><span>Preview Guide Text</span></a>');
			}
		});
		
		request.fail(function(jqXHR, textStatus) {
			alert( "Request failed: " + textStatus );
			$('#preview_guide_loading').replaceWith('<a id="preview_guide" href="'+site_root+'/dota-2/preview-guide" class="small_buttons"><img src="'+site_root+'/images/icons/eye.png" /><span>Preview Guide Text</span></a>');
		});
		
	});
	
	//Quick insert buttons
	$(document).on('click', '.ability_medium_icon_tt', function(ev) {
		if($(this).parent().hasClass('quick_insert')) {
			ev.preventDefault();
			bbcode('[ability='+$(this).parent().attr('id')+']', '', document.forms.guide_text.guide)
		}
	});
	
	$(document).on('click', '.quick_insert_item', function(ev) {
		ev.preventDefault();
		if($(this).parent().hasClass('quick_insert')) {
			bbcode('[item='+$(this).parent().attr('id')+']', '', document.forms.guide_text.guide)
		}
	});

	if(new_guide == 1) {
		createItemGroup();
		
		buildItemFilters();
		buildItemList();
		
		$('#hero_guide_text').autoResize({"maxHeight": 999999});
		
		//Check for saved cookie data to auto fill our stuff
		getSavedData(0);
	}
	
	if(edit_guide == 1) {
		buildItemFilters();
		buildItemList();
		
		$('#hero_guide_text').autoResize({"maxHeight": 999999});
		
		getSavedData(1);
		
		if(!$('.item_group_wrapper').length) {
			$('#no_item_builds').trigger('click');
			//$('#hero_item_builds_header').html('Step 3 - Item Builds (None - <a id="item_builds_change" href="#">Change</a>)');
		}
	}
	
	//We call this once veryhitng is done because if we level stats first we need to recalculate because you can't start lower then level 1
	//updateStats();
	
	//This needs to be after all DOM mods or we would need to call recalc position
	$(".hero_guide_quick_insert").jScroll();
	
});