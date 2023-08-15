package com.gerenciamentoescolas.server.entities;

import java.util.Date;
import java.util.Objects;

public class LessonKey {
    private Date lessonDay;
    private int registerSchoolId;

    public LessonKey(Date lessonDay, int registerSchoolId) {
        this.lessonDay = lessonDay;
        this.registerSchoolId = registerSchoolId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(lessonDay, registerSchoolId);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        LessonKey other = (LessonKey) obj;
        return Objects.equals(lessonDay, other.lessonDay) && registerSchoolId == other.registerSchoolId;
    }
}
