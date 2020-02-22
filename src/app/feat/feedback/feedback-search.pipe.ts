import { Pipe, PipeTransform } from '@angular/core';
import { Feedback } from './feedback.class';

@Pipe({
  name: 'feedbackSrch'
})
export class FeedbackSearchPipe implements PipeTransform {

  transform(feedbacks: Feedback[], criteria: string = ''): Feedback[] {
    if (criteria == '') { return feedbacks; }
    let selFbs: Feedback[] = [];
    feedbacks.forEach(fb => {
      if(
        fb.id.toString().toLowerCase().includes(criteria.toLowerCase()) ||
        fb.category.toString().toLowerCase().includes(criteria.toLowerCase()) ||
        fb.title.toString().toLowerCase().includes(criteria.toLowerCase()) ||
        fb.text.toString().toLowerCase().includes(criteria.toLowerCase()) ||
        (fb.userName != null && fb.userName.toString().toLowerCase().includes(criteria.toLowerCase()))
      ) { selFbs.push(fb); }
    });
    return selFbs;
  }

}
