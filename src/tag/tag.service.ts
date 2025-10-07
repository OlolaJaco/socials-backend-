import { Injectable } from '@nestjs/common';

@Injectable()
export class TagService {
    getAllTags() {
        return ['tag1', 'tag2', 'tag3'];
    }
}
