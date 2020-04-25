import { Pipe, PipeTransform } from '@angular/core';
import { Commentary } from './commentary.class';

@Pipe({
  name: 'commentarySearch'
})
export class CommentarySearchPipe implements PipeTransform {

  transform(commentaries: Commentary[], criteria:string = ""): Commentary[] {
    if(criteria == ""){return commentaries}
    let selCommentaries: Commentary[] = [];
    commentaries.forEach(commentary =>{
      if(
        commentary.id.toString().toLowerCase().includes(criteria.toLowerCase()) ||
        commentary.text.toLowerCase().includes(criteria.toLowerCase()) ||
        (commentary.lastAccessUserId != null && commentary.lastAccessUserId.toString().toLowerCase().includes(criteria.toLowerCase())) ||
        (commentary.studentId != null && commentary.studentId.toString().toLowerCase().includes(criteria.toLowerCase()))
      ){selCommentaries.push(commentary);}
    });
    return selCommentaries;
  }

}
